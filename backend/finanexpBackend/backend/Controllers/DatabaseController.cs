using AutoMapper;
using backend.DataBase;
using backend.dtos;
using backend.models;
using backend.support.enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text;

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

  [HttpGet]
  [Authorize]
  public ActionResult<IEnumerable<UserReadDto>> GetAllUsers()
  {
    var usersList = _UserDatabase.GetAllUsers();
    return Ok(_Mapper.Map<IEnumerable<UserReadDto>>(usersList));
  }

  [HttpGet("{id}", Name = "GetUserByID")]
  [Authorize]
  public ActionResult<UserReadDto> GetUserByID(int id)
  {
    var userItem = _UserDatabase.GetUserByID(id);
    if (userItem != null)
    {
      return Ok(_Mapper.Map<UserReadDto>(userItem));
    }
    return NotFound();
  }


  [HttpPost("add")]

  public ActionResult<UserReadDto> CreateUser(UserCreateDto user)
  {
    var UserModel = _Mapper.Map<UserModel>(user);
    var verifyUserModel = _UserDatabase.GetUserByEmail(UserModel.email);

    if (verifyUserModel == null)
    {
      _UserDatabase.CreateUser(UserModel);
      _UserDatabase.SaveChanges();

      var userReadDto = _Mapper.Map<UserReadDto>(UserModel);

      return CreatedAtRoute(nameof(GetUserByID), new { Id = userReadDto.ID }, userReadDto); ;
    }
    else
    {
      var error = EnumerableErrors.userRegistred.ToString();
      return BadRequest(error);
    }

  }
  [HttpPut("{id}")]
  [Authorize]
  public ActionResult<UserReadDto> UpdateUser(int id, UserUpdateDto user)
  {
    var userFromEmail = _UserDatabase.GetUserByEmail(user.email);

    if (userFromEmail == null || userFromEmail.ID == id)
    {
      var newUser = _UserDatabase.UpdateUser(id, user);
      if (newUser != null)
      {
        return Ok(_Mapper.Map<UserReadDto>(newUser));
      }
      else
      {
        return NotFound();
      }
    }
    else
    {
      return BadRequest();
    }
  }
}
