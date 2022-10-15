using backend.models;
using backend.Users.Dtos;

namespace backend.Shared.Users.Services
{
  public interface IUserDatabaseService
  {
    IEnumerable<User> GetAllUsers();
    User GetUserByID(Guid id);
    User GetUserByEmail(string email);
    bool CreateUser(User user);
    User UpdateUser(Guid id, UserUpdateDto newUser);
    bool SaveChanges();
  }
}
