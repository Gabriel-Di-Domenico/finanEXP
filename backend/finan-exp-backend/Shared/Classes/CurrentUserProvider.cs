using Authenticate.Services;
using Shared.Interfaces;
using Users.Models;
using Users.Services;

namespace Shared.Classes
{
  public class CurrentUserProvider
  {
    private readonly IHttpContextAccessor _accessor;
    private readonly IRepository<User> _userRepository;

    private User CurrentUser { get; set; }

    public CurrentUserProvider(IHttpContextAccessor accessor, IRepository<User> userRepository)
    {
      _accessor = accessor;
      _userRepository = userRepository;
    }
    public User GetCurrentUser()
    {
      var Bearertoken = _accessor.HttpContext.Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));
      CurrentUser = _userRepository.FirstOrDefault(user => user.Id == userId);
      return CurrentUser;
    }
  }
}
