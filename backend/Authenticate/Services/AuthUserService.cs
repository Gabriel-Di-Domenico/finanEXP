using backend.models;
using backend.Authenticate.Dtos;
using backend.Shared.Services;
using backend.Shared.Enums;

namespace backend.Authenticate.Services
{
  public class AuthUserService : IAuthUserService
  {
    public ResponseStatus<string> AuthUser(UserAuthDto user, User userFromDatabase)
    {

      bool authenticatePassword = AuthenticatePasswords(user.password, userFromDatabase.password);

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
