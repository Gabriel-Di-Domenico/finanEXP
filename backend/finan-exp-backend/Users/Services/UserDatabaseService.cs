using Authenticate.Services;
using Contexts;
using Shared.Enums;
using Shared.Services;
using Users.Dtos;
using Users.Models;

namespace Users.Services
{
  public class UserDatabaseService : IUserDatabaseService
  {
    private readonly FinEXPDatabaseContext _context;
    private readonly IAuthUserService _authUserService;

    public UserDatabaseService()
    {

    }
    public UserDatabaseService(FinEXPDatabaseContext context, IAuthUserService authUserService)
    {
      _context = context;
      _authUserService = authUserService;
    }

    public ResponseStatus CreateUser(User user)
    {
      var verifyExistingUser = GetUserByEmail(user.email);

      if (verifyExistingUser == null)
      {
        user.password = Bcrypt.Encrypt(user.password);

        _context.Users.Add(user);
        SaveChanges();
        return ResponseStatus.Ok;
      }
      else
      {
        return ResponseStatus.AlreadyExists;
      }
    }

    public IEnumerable<User> GetAllUsers()
    {
      return _context.Users.ToList();
    }

    public User GetUserByID(Guid id)
    {
      return _context.Users.FirstOrDefault(p => p.ID == id);
    }

    public bool SaveChanges()
    {
      return _context.SaveChanges() >= 0;
    }

    public User GetUserByEmail(string email)
    {
      return _context.Users.FirstOrDefault(p => p.email == email);
    }

    public ResponseStatus UpdateUser(Guid id, UserUpdateDto newUser)
    {
      var verifyExistingUser = GetUserByEmail(newUser.email);

      if (verifyExistingUser == null || verifyExistingUser.ID == id)
      {
        var userFromDataBase = GetUserByID(id);

        userFromDataBase.email = newUser.email;
        userFromDataBase.name = newUser.name;

        if (newUser.NewPassword != null)
        {
          var authenticatedPassword = _authUserService.AuthenticatePasswords(newUser.password, userFromDataBase.password);

          if (authenticatedPassword)
          {
            var newPassword = Bcrypt.Encrypt(newUser.NewPassword);
            userFromDataBase.password = newPassword;
          }
          else
          {
            return ResponseStatus.Unauthorized;
          }
        }

        _context.Update(userFromDataBase);
        SaveChanges();
        return ResponseStatus.Ok;
      }
      else
      {
        return ResponseStatus.AlreadyExists;
      }
    }
  }
}
