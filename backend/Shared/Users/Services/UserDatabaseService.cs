using backend.Authenticate.Services;
using backend.Contexts;
using backend.models;
using backend.Shared.Services;
using backend.UserSettings.Dtos;
using System.Text;

namespace backend.Shared.Users.Services
{
  public class UserDatabaseService : IUserDatabaseService
  {
    private readonly FinEXPDatabaseContext _context;

    public UserDatabaseService(FinEXPDatabaseContext context)
    {
      _context = context;
    }

    public bool CreateUser(User user)
    {
      if (user == null)
      {
        throw new ArgumentNullException(nameof(user));
        return false;
      }
      else
      {
        user.password = Bcrypt.Encrypt(user.password);

        _context.Users.Add(user);
        return true;
      }
      
    }

    public IEnumerable<User> GetAllUsers()
    {
      return _context.Users.ToList();
    }

    public User GetUserByID(Guid id)
    {
      var users = _context.Users.FirstOrDefault(p => p.ID == id);
      if (users != null)
      {
        return users;
      }
      else
      {
        return null;
      }
    }

    public bool SaveChanges()
    {
      return _context.SaveChanges() >= 0;
    }

    public User GetUserByEmail(string email)
    {
      var users = _context.Users.FirstOrDefault(p => p.email == email);
      if (users != null)
      {
        return users;
      }
      else
      {
        return null;
      }
    }

    public User UpdateUser(Guid id, UserUpdateDto newUser)
    {
      var user = GetUserByID(id);

      if (user != null)
      {
        if (newUser.perfilPhoto != null)
        {
          byte[] bytes = Encoding.UTF8.GetBytes(newUser.perfilPhoto);
          user.perfilPhoto = bytes;
        }

        if (user.email != newUser.email || user.name != newUser.name)
        {
          user.email = newUser.email;
          user.name = newUser.name;
        }

        _context.Update(user);
        SaveChanges();
        return user;
      }
      else
      {
        return null;
      }
    }

    public User UpdateUserPassword(Guid id, UpdatePasswordDto passwordConfigs)
    {
      var userFromDatabase = GetUserByID(id);
      var authenticatedPassword = AuthUserService.AuthenticatePasswords(passwordConfigs.ActualPassword, userFromDatabase.password);

      if (authenticatedPassword)
      {
        var newUser = userFromDatabase;
        var newPassword = Bcrypt.Encrypt(passwordConfigs.NewPassword);
        newUser.password = newPassword;

        _context.Update(newUser);
        SaveChanges();
        return newUser;
      }
      else
      {
        return null;
      }
    }
  }
}
