using Authenticate.Dtos;
using Shared.Enums;
using Shared.Services;
using Users.Models;

namespace Authenticate.Services
{
  public class AuthUserService : IAuthUserService
  {
    public ResponseStatus<string> AuthUser(UserAuthDto user, User userFromDatabase)
    {

      bool authenticatePassword = AuthenticatePasswords(user.Password, userFromDatabase.Password);

      if (authenticatePassword)
      {
        var token = TokenService.GenerateToken(userFromDatabase);
        return new ResponseStatus<string> { Status = ResponseStatus.Ok, Content = token };
      }
      else
      {
        return new ResponseStatus<string> { Status = ResponseStatus.Unauthorized };
      }
    }
    public bool AuthenticatePasswords(string password, string passwordFromDataBase)
    {
      var encryptedPassword = Bcrypt.Encrypt(password);

      if (encryptedPassword == passwordFromDataBase)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  }
}
