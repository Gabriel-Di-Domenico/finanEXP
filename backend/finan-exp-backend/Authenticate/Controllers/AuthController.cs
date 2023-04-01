using Authenticate.Dtos;
using Authenticate.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Dtos;
using Shared.Enums;
using Shared.Messages;
using Users.Services;

namespace Authenticate.Controllers
{
  [Route("auth")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly IUserDatabaseService _UserDatabase;
    private readonly IAuthUserService _authUserService;

    public AuthController(IUserDatabaseService userDatabase, IAuthUserService authUserService)
    {
      _UserDatabase = userDatabase;
      _authUserService = authUserService;
    }
    [HttpPost("user")]
    public async Task<ActionResult<ReturnDto<string>>> AuthenticateAsync([FromBody] UserAuthDto user)
    {
      var userFromDatabase = await _UserDatabase.GetUserByEmail(user.Email);

      var result = new ReturnDto<string>();

      if (userFromDatabase != null)
      {
        var responseAuthUser = _authUserService.AuthUser(user, userFromDatabase);

        if (responseAuthUser.Status == ResponseStatus.Ok)
        {

          result.Message = new Message
          {
            error = false,
            message = "Usuário autenticado"
          };
          result.Content = responseAuthUser.Content;

          return Ok(result);
        }
        else if (responseAuthUser.Status == ResponseStatus.Unauthorized)
        {
          result.Message = new Message
          {
            error = true,
            message = "Usuário não autorizado"
          };
          result.Content = responseAuthUser.Content;

          return Unauthorized(result);
        }

        throw new Exception("Error AuthUser");
      }
      else
      {

        result.Message = new Message
        {
          error = true,
          message = "Usuário não Registrado"
        };
        result.Content = null;

        return Unauthorized(result);
      }
      throw new Exception("Error AuthUser");

    }
    [HttpGet("verifyToken")]
    [Authorize]
    public ActionResult<ReturnDto<string>> VerifyToken()
    {
      var Bearertoken = Request.Headers["Authorization"];

      var result = new ReturnDto<string>();

      string userID = TokenService.DeserializeToken(Bearertoken);

      if (userID != null)
      {

        result.Message = new Message
        {
          error = false,
          message = "Token válido"
        };
        result.Content = userID;

        return Ok(result);
      }
      else
      {
        result.Message = new Message
        {
          error = true,
          message = "Token inválido"
        };
        result.Content = null;

        return Ok(result);
      }
      throw new Exception("Error Verify Token");

    }
  }
}
