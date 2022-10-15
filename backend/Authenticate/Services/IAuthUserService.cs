using backend.Authenticate.Dtos;
using backend.models;
using backend.Shared.Enums;

namespace backend.Authenticate.Services
{
  public interface IAuthUserService
  {
    ResponseStatus<string> AuthUser(UserAuthDto user, User userFromDatabase);
    bool AuthenticatePasswords(string password, string passwordFromDataBase);
  }
}
