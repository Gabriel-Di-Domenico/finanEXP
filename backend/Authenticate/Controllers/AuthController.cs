using AutoMapper;
using backend.Authenticate.Dtos;
using backend.Authenticate.Services;
using backend.Messages;
using backend.Shared.Dtos;
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
    public ActionResult<ReturnDto<string>> AuthenticateAsync([FromBody] UserAuthDto user)
    {
      var userFromDatabase = _UserDatabase.GetUserByEmail(user.email);

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
      throw new Exception("Error Auth User");

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
