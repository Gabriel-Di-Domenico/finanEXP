using AutoMapper;
using backend.DataBase;
using backend.dtos;
using backend.models;
using backend.services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
  [Route("auth")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly IDataUser _UserDatabase;
    private readonly IMapper _Mapper;
    public AuthController(IDataUser userDatabase, IMapper mapper)
    {
      _UserDatabase = userDatabase;
      _Mapper = mapper;
    }
    [HttpPost("user")]
    public ActionResult<dynamic> AuthenticateAsync([FromBody] UserAuthDto user)
    {
      var UserModel = _Mapper.Map<UserModel>(user);
      var userFromDatabase = _UserDatabase.GetUserByEmail(UserModel.email);

      if (userFromDatabase != null)
      {
        string JWT = AuthUserService.AuthUser(user, userFromDatabase);
        if (JWT != null)
        {
          var jsonWithJWT = new JsonResult(JWT);
          return Ok(jsonWithJWT);
        }
        else
        {
          return Unauthorized();
        }
      }
      else
      {
        return Unauthorized();
      }

    }
    [HttpGet("verifyToken")]
    [Authorize]
    public ActionResult<bool> VerifyToken()
    {
      var Bearertoken = Request.Headers["Authorization"];
      
      UserOutput user = TokenService.DeserializeToken(Bearertoken);

      if(user != null)
      {
        return Ok(user);
      }
      else
      {
        return Ok(false);
      }
      
    }
  }
}
