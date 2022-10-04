using backend.Authenticate.Services;
using backend.Contexts;
using backend.models;
using backend.Shared.Services;
using backend.Shared.Users.Services;
using backend.UserSettings.Dtos;
using System.Text;

namespace backend.UserSettings.Services
{
  public class UserSettingsService : IUserSettingsService
  {
    private readonly IUserDatabaseService _userDatabaseService;
    private readonly FinEXPDatabaseContext _context;

    public UserSettingsService(IUserDatabaseService userDatabaseService,FinEXPDatabaseContext context)
    {
      _userDatabaseService = userDatabaseService;
      _context = context;
    }
    public UserModel UpdateUser(Guid id, UserUpdateDto newUser)
    {
      var user = _userDatabaseService.GetUserByID(id);

      if (user != null)
      {
        if (newUser.perfilPhoto != null)
        {
          byte[] bytes = Encoding.UTF8.GetBytes(newUser.perfilPhoto);
          user.perfilPhoto = bytes;
        }

        if (user.email != newUser.email || user.name != newUser.name)
        {
          user.email = newUser.email;
          user.name = newUser.name;
        }

        _context.Update(user);
        _userDatabaseService.SaveChanges();
        return user;
      }
      else
      {
        return null;
      }
    }

    public UserModel UpdateUserPassword(Guid id, UpdatePasswordDto passwordConfigs)
    {
      var userFromDatabase = _userDatabaseService.GetUserByID(id);
      var authenticatedPassword = AuthUserService.AuthenticatePasswords(passwordConfigs.ActualPassword, userFromDatabase.password);

      if (authenticatedPassword)
      {
        var newUser = userFromDatabase;
        var newPassword = Bcrypt.Encrypt(passwordConfigs.NewPassword);
        newUser.password = newPassword;

        _context.Update(newUser);
        _userDatabaseService.SaveChanges();
        return newUser;
      }
      else
      {
        return null;
      }
    }
  }
}
