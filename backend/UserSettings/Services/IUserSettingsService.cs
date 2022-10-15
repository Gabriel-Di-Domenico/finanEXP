using backend.models;
using backend.UserSettings.Dtos;

namespace backend.UserSettings.Services
{
  public interface IUserSettingsService
  {
    User UpdateUser(Guid id, UserUpdateDto newUser);
    User UpdateUserPassword(Guid id, UpdatePasswordDto passwordConfigs);
  }
}
