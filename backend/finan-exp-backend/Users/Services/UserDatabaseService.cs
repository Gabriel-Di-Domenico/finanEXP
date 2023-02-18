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
      var verifyExistingUser = GetUserByEmail(user.Email);

      if (verifyExistingUser == null)
      {
        user.Password = Bcrypt.Encrypt(user.Password);

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
      return _context.Users.FirstOrDefault(p => p.Id == id);
    }

    public bool SaveChanges()
    {
      return _context.SaveChanges() >= 0;
    }

    public User GetUserByEmail(string email)
    {
      return _context.Users.FirstOrDefault(p => p.Email == email);
    }

    public ResponseStatus UpdateUser(Guid id, UserUpdateDto newUser)
    {
      var verifyExistingUser = GetUserByEmail(newUser.email);

      if (verifyExistingUser == null || verifyExistingUser.Id == id)
      {
        var userFromDataBase = GetUserByID(id);

        userFromDataBase.Email = newUser.email;
        userFromDataBase.Name = newUser.name;

        if (newUser.NewPassword != null)
        {
          var authenticatedPassword = _authUserService.AuthenticatePasswords(newUser.password, userFromDataBase.Password);

          if (authenticatedPassword)
          {
            var newPassword = Bcrypt.Encrypt(newUser.NewPassword);
            userFromDataBase.Password = newPassword;
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
