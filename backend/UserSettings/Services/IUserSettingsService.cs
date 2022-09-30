using backend.models;
using backend.UserSettings.Dtos;

namespace backend.UserSettings.Services
{
  public interface IUserSettingsService
  {
    UserModel UpdateUser(int id, UserUpdateDto newUser);
    UserModel UpdateUserPassword(int id, UpdatePasswordDto passwordConfigs);
  }
}
