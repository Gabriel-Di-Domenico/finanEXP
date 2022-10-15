using backend.Authenticate.Services;
using backend.Contexts;
using backend.models;
using backend.Shared.Services;
using backend.Users.Dtos;
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
        if (newUser.NewPassword != null)
        {
          var authenticatedPassword = AuthUserService.AuthenticatePasswords(newUser.password, user.password);
          if (authenticatedPassword)
          {
            var newPassword = Bcrypt.Encrypt(newUser.NewPassword);
            user.password = newPassword;
          }
          else
          {
            //TODO retornar mensagem de erro
          }
        }
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
  }
}
