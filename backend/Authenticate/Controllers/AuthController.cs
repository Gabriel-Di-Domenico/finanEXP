using AutoMapper;
using backend.Authenticate.Dtos;
using backend.Authenticate.Services;
using backend.Messages;
using backend.Shared.Users.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Authenticate.Controllers
{
  [Route("auth")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly IUserDatabaseService _UserDatabase;
    private readonly IMapper _Mapper;
    public AuthController(IUserDatabaseService userDatabase, IMapper mapper)
    {
      _UserDatabase = userDatabase;
      _Mapper = mapper;
    }
    [HttpPost("user")]
    public ActionResult<dynamic> AuthenticateAsync([FromBody] UserAuthDto user)
    {
      var userFromDatabase = _UserDatabase.GetUserByEmail(user.email);

      var result = new AuthUserReturnDto();

      if (userFromDatabase != null)
      {
        string JWT = AuthUserService.AuthUser(user, userFromDatabase);

        if (JWT != null)
        {

          result.Message = new Message
          {
            error = false,
            message = "Usuário autenticado"
          };
          result.JWT = JWT;

          return Ok(result);
        }
        else
        {
          result.Message = new Message
          {
            error = true,
            message = "Usuário não autorizado"
          };
          result.JWT = null;

          return Unauthorized(result);
        }
      }
      else
      {

        result.Message = new Message
        {
          error = true,
          message = "Usuário não Registrado"
        };
        result.JWT = null;

        return Unauthorized(result);
      }

    }
    [HttpGet("verifyToken")]
    [Authorize]
    public ActionResult<string> VerifyToken()
    {
      var Bearertoken = Request.Headers["Authorization"];

      var result = new VerifyTokenReturnDto();

      string userID = TokenService.DeserializeToken(Bearertoken);

      if (userID != null)
      {

        result.Message = new Message
        {
          error = false,
          message = "Token válido"
        };
        result.Token = userID;

        return Ok(result);
      }
      else
      {

        result.Message = new Message
        {
          error = true,
          message = "Token inválido"
        };
        result.Token = null;

        return Ok(result);
      }

    }
  }
}
