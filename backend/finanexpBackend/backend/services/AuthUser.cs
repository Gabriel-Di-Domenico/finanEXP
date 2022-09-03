using backend.models;
using backend.dtos;

namespace backend.services
{
  public static class AuthUserService
  {
    public static string AuthUser(UserAuthDto user, UserModel userFromDataBase)
    {

      bool matchPassword = Bcrypt.Decrypt(user.password, userFromDataBase.password);

      if (matchPassword)
      {
        var token = TokenService.GenerateToken(userFromDataBase);
        return token;
      }
      else
      {
        return null;
      }
    }
  }
}
