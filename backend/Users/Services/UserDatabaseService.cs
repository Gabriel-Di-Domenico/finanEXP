using backend.Authenticate.Services;
using backend.Contexts;
using backend.models;
using backend.Shared.Enums;
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
