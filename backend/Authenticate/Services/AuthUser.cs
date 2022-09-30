using backend.models;
using backend.Authenticate.Dtos;
using backend.Shared.Services;

namespace backend.Authenticate.Services
{
  public static class AuthUserService
  {
    public static string AuthUser(UserAuthDto user, UserModel userFromDataBase)
    {

      bool authenticatePassword = AuthenticatePasswords(user.password, userFromDataBase.password);

      if (authenticatePassword)
      {
        var token = TokenService.GenerateToken(userFromDataBase);
        return token;
      }
      else
      {
        return null;
      }
    }
    public static bool AuthenticatePasswords(string password, string passwordFromDataBase)
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
