using AutoMapper;
using backend.Messages;
using backend.Shared.Dtos;
using backend.Shared.Users.Services;
using backend.UserSettings.Dtos;
using backend.UserSettings.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.UserSettings.Controllers
{
  [Route("user-settings")]
  [ApiController]
  public class UserSettingsController : ControllerBase
  {
    private readonly IUserDatabaseService _userDataBaseService;
    private readonly IUserSettingsService _userSettingsService;
    private readonly IMapper _Mapper;

    public UserSettingsController(IUserDatabaseService userDataBaseService,IUserSettingsService userSettingsService, IMapper mapper)
    {
      _userDataBaseService = userDataBaseService;
      _userSettingsService = userSettingsService;
      _Mapper = mapper;
    }

    [HttpPut("{id}")]
    [Authorize]
    public ActionResult<UserReadDto> UpdateUser([FromRoute] Guid id, [FromBody] UserUpdateDto user)
    {
      var userFromEmail = _userDataBaseService.GetUserByEmail(user.email);

      var result = new ReturnDto();

      if (userFromEmail == null || userFromEmail.ID == id)
      {
        var newUser = _userSettingsService.UpdateUser(id, user);
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

    [HttpPut("update-password/{id}")]
    [Authorize]
    public ActionResult UpdateUserPassword([FromRoute] Guid id, [FromBody] UpdatePasswordDto passwordConfigs)
    {
      var newUser = _userSettingsService.UpdateUserPassword(id, passwordConfigs);

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
}
