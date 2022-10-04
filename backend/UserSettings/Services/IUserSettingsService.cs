using backend.models;
using backend.UserSettings.Dtos;

namespace backend.UserSettings.Services
{
  public interface IUserSettingsService
  {
    UserModel UpdateUser(Guid id, UserUpdateDto newUser);
    UserModel UpdateUserPassword(Guid id, UpdatePasswordDto passwordConfigs);
  }
}
