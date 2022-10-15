using backend.Authenticate.Services;
using backend.Shared.Users.Services;

namespace backend.Shared.Services
{
  public class AuthAndUserDependecyInjection : IAuthAndUserDependecyInjection
  {
    public AuthAndUserDependecyInjection(IUserDatabaseService userDatabaseService, IAuthUserService authUserService)
    {
      _UserDatabaseService = userDatabaseService;
      _AuthUserService = authUserService;
    }

    public IUserDatabaseService _UserDatabaseService { get; }
    public IAuthUserService _AuthUserService { get; }
  }
}
