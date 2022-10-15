using AutoMapper;
using backend.Messages;
using backend.models;
using backend.Shared.Dtos;
using backend.Shared.Users.Services;
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
  public ActionResult<UserReadDto> GetUserByID([FromRoute] Guid id)
  {
    var userItem = _UserDatabaseService.GetUserByID(id);
    var result = new GetUserByIdReturnDto();
    if (userItem != null)
    {
      result.Message = new Message
      {
        error = false,
        message = "Sucesso"
      };
      result.User = _Mapper.Map<UserReadDto>(userItem);

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
    var verifyUser = _UserDatabaseService.GetUserByEmail(User.email);

    var result = new ReturnDto();

    if (verifyUser == null)
    {
      if (_UserDatabaseService.CreateUser(User))
      {
        _UserDatabaseService.SaveChanges();
      }
      else
      {
        result.Message = new Message
        {
          error = true,
          message = "Erro ao criar usuário"
        };
        return BadRequest(result);
      };

      result.Message = new Message
      {
        error = false,
        message = "Usuário criado com sucesso"
      };

      return Created("", result);
    }
    else
    {
      result.Message = new Message
      {
        error = true,
        message = "Usuário já registrado"
      };
      return BadRequest(result);
    }
  }
}
