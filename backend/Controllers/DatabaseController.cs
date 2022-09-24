using AutoMapper;
using backend.DataBase;
using backend.dtos;
using backend.Messages;
using backend.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("/users")]
[ApiController]
public class DatabaseController : ControllerBase
{
  private readonly IDataUser _UserDatabase;
  private readonly IMapper _Mapper;

  public DatabaseController(IDataUser userDatabase, IMapper mapper)
  {
    _UserDatabase = userDatabase;
    _Mapper = mapper;
  }

  [HttpGet("{id}", Name = "GetUserByID")]
  [Authorize]
  public ActionResult<UserReadDto> GetUserByID([FromRoute] int id)
  {
    var userItem = _UserDatabase.GetUserByID(id);
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

  public ActionResult<UserReadDto> CreateUser([FromBody] UserCreateDto user)
  {
    var UserModel = _Mapper.Map<UserModel>(user);
    var verifyUserModel = _UserDatabase.GetUserByEmail(UserModel.email);

    var result = new ReturnDto();

    if (verifyUserModel == null)
    {
      _UserDatabase.CreateUser(UserModel);
      _UserDatabase.SaveChanges();

      var userReadDto = _Mapper.Map<UserReadDto>(UserModel);

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
  [HttpPut("{id}")]
  [Authorize]
  public ActionResult<UserReadDto> UpdateUser([FromRoute] int id, [FromBody] UserUpdateDto user)
  {
    var userFromEmail = _UserDatabase.GetUserByEmail(user.email);

    var result = new ReturnDto();

    if (userFromEmail == null || userFromEmail.ID == id)
    {
      var newUser = _UserDatabase.UpdateUser(id, user);
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
  [HttpPut("update-user/{id}")]
  [Authorize]
  public ActionResult UpdateUserPassword([FromRoute] int id, [FromBody] UpdatePasswordDto passwordConfigs)
  {
    var newUser = _UserDatabase.UpdateUserPassword(id, passwordConfigs);

    var result = new ReturnDto();

    if (newUser != null)
    {
      result.Message = new Message
      {
        error = false,
        message = "Senha alterada com sucesso"
      };

      return Ok(result);
    }
    else
    {
      result.Message = new Message
      {
        error = true,
        message = "A senha atual está incorreta"
      };

      return BadRequest(result);
    }

  }
}
