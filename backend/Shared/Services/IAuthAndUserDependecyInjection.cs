using backend.Authenticate.Services;
using backend.Shared.Users.Services;

namespace backend.Shared.Services
{
  public interface IAuthAndUserDependecyInjection
  {
    public IUserDatabaseService _UserDatabaseService { get; }
    public IAuthUserService _AuthUserService { get; }
  }
}
