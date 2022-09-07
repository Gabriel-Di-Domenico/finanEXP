using backend.dtos;
using backend.models;
using backend.services;

namespace backend.DataBase
{
  public class UserDatabase : IDataUser
  {
    private readonly UserContext _Context;

    public UserDatabase(UserContext context)
    {
      _Context = context;
    }

    public void CreateUser(UserModel user)
    {
      if (user == null)
      {
        throw new ArgumentNullException(nameof(user));
      }
      user.password = Bcrypt.Encrypt(user.password);

      _Context.Users.Add(user);
    }

    public IEnumerable<UserModel> GetAllUsers()
    {
      return _Context.Users.ToList();
    }

    public UserModel GetUserByID(int id)
    {
      var users = _Context.Users.FirstOrDefault(p => p.ID == id);
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
      return (_Context.SaveChanges() >= 0);
    }

    public UserModel GetUserByEmail(string email)
    {
      var users = _Context.Users.FirstOrDefault(p => p.email == email);
      if (users != null)
      {
        return users;
      }
      else
      {
        return null;
      }
    }

    public UserModel UpdateUser(int id, UserUpdateDto newUser)
    {
      var user = GetUserByID(id);
      
      if (user != null)
      {
        if(user.email != newUser.email || user.name != newUser.name)
        {
          user.email = newUser.email;
          user.name = newUser.name;
        }

        _Context.Update(user);
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
