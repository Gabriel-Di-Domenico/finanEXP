using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Dtos;
using Shared.Enums;
using Shared.Messages;
using Users.Dtos;
using Users.Models;
using Users.Services;

namespace Users.Controllers;

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
  public async Task<ActionResult<ReturnDto<UserOutput>>> GetUserByID([FromRoute] Guid id)
  {
    var user = await _UserDatabaseService.GetUserByID(id);

    var result = new ReturnDto<UserOutput>();

    if (user != null)
    {
      result.Message = new Message
      {
        error = false,
        message = "Sucesso"
      };
      result.Content = _Mapper.Map<UserOutput>(user);

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
  public async Task<ActionResult<ReturnDto>> CreateUser([FromBody] UserInput input)
  {
    var result = new ReturnDto();

    var createUserResult = await _UserDatabaseService.CreateUser(input);

    if (createUserResult == ResponseStatus.Ok)
    {
      result.Message = new Message
      {
        error = false,
        message = "Usuário criado com sucesso"
      };

      return Created("", result);

    }
    else if (createUserResult == ResponseStatus.AlreadyExists)
    {
      result.Message = new Message
      {
        error = true,
        message = "Usuário já cadastrado"
      };

      return BadRequest(result);
    }
    throw new Exception("Create user error");
  }

  [HttpPut("{id}")]
  [Authorize]
  public async Task<ActionResult<ReturnDto>> UpdateUser([FromRoute] Guid id, [FromBody] UserInput input)
  {
    var updateUserResponse = await _UserDatabaseService.UpdateUser(id, input);

    var result = new ReturnDto();

    if (updateUserResponse == ResponseStatus.Ok)
    {
      result.Message = new Message
      {
        error = false,
        message = "Preferências salvas com sucesso"
      };
      return Ok(result);
    }
    else if (updateUserResponse == ResponseStatus.AlreadyExists)
    {
      result.Message = new Message
      {
        error = true,
        message = "Email já em uso"
      };
      return BadRequest(result);
    }
    else if (updateUserResponse == ResponseStatus.Unauthorized)
    {
      result.Message = new Message
      {
        error = true,
        message = "Senha atual não corresponde"
      };
      return BadRequest(result);
    }
    throw new Exception("Update user error");
  }
}
