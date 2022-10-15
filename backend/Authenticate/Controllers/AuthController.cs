using AutoMapper;
using backend.Authenticate.Dtos;
using backend.Authenticate.Services;
using backend.Messages;
using backend.Shared.Enums;
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
    private readonly IAuthUserService _authUserService;

    public AuthController(IUserDatabaseService userDatabase, IMapper mapper, IAuthUserService authUserService)
    {
      _UserDatabase = userDatabase;
      _Mapper = mapper;
      _authUserService = authUserService;
    }
    [HttpPost("user")]
    public ActionResult<dynamic> AuthenticateAsync([FromBody] UserAuthDto user)
    {
      var userFromDatabase = _UserDatabase.GetUserByEmail(user.email);

      var result = new AuthUserReturnDto();

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
          result.JWT = responseAuthUser.Content;

          return Ok(result);
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
        result.JWT = null;

        return Unauthorized(result);
      }
      throw new Exception("Error Auth User");

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
      throw new Exception("Error Verify Token");

    }
  }
}
