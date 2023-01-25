using Authenticate.Dtos;
using Shared.Enums;
using Users.Models;

namespace Authenticate.Services
{
  public interface IAuthUserService
  {
    ResponseStatus<string> AuthUser(UserAuthDto user, User userFromDatabase);
    bool AuthenticatePasswords(string password, string passwordFromDataBase);
  }
}
