using AutoMapper;
using backend.Messages;
using backend.models;
using backend.Shared.Dtos;
using backend.Shared.Enums;
using backend.Shared.Users.Services;
using backend.Users.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Shared.Controllers;

[Route("/users")]
[ApiController]
public class UserDatabaseController : ControllerBase
{
  private readonly IUserDatabaseService _UserDatabaseService;
  private readonly IMapper _Mapper;

  public UserDatabaseController(IUserDatabaseService userDatabase, IMapper mapper)
  {
    _UserDatabaseService = userDatabase;
    _Mapper = mapper;
  }

  [HttpGet("{id}", Name = "GetUserByID")]
  [Authorize]
  public ActionResult<GetUserByIdReturnDto> GetUserByID([FromRoute] Guid id)
  {
    var user = _UserDatabaseService.GetUserByID(id);

    var result = new GetUserByIdReturnDto();

    if (user != null)
    {
      result.Message = new Message
      {
        error = false,
        message = "Sucesso"
      };
      result.User = _Mapper.Map<UserReadDto>(user);

      return Ok(result);
    }

    result.Message = new Message
    {
      error = true,
      message = "Falha"
    };
    return NotFound(result);
  }


  [HttpPost("add")]

  public ActionResult<ReturnDto> CreateUser([FromBody] UserCreateDto user)
  {
    var User = _Mapper.Map<User>(user);

    var result = new ReturnDto();

    var createUserResult = _UserDatabaseService.CreateUser(User);

    if (createUserResult == ResponseStatus.Ok)
    {
      result.Message = new Message
      {
        error = false,
        message = "Usuário criado com sucesso"
      };

      return Created("", result);

    }else if(createUserResult == ResponseStatus.AlreadyExists)
    {
      result.Message = new Message
      {
        error = true,
        message = "Usuário já cadastrado"
      };

      return Created("", result);
    }
    throw new Exception("Create user error");
  }

  [HttpPut("{id}")]
  [Authorize]
  public ActionResult<UserReadDto> UpdateUser([FromRoute] Guid id, [FromBody] UserUpdateDto user)
  {
    var userFromEmail = _UserDatabaseService.GetUserByEmail(user.email);

    var result = new ReturnDto();

    if (userFromEmail == null || userFromEmail.ID == id)
    {
      var newUser = _UserDatabaseService.UpdateUser(id, user);
      if (newUser != null)
      {
        result.Message = new Message
        {
          error = false,
          message = "Preferências salvas com sucesso"
        };
        return Ok(result);
      }
      else
      {
        result.Message = new Message
        {
          error = true,
          message = "Erro ao modificar preferências"
        };
        return NotFound(result);
      }
    }
    else
    {
      result.Message = new Message
      {
        error = true,
        message = "Email já em uso"
      };
      return BadRequest(result);
    }
  }
}
