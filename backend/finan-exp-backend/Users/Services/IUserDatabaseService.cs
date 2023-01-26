using Shared.Enums;
using Users.Dtos;
using Users.Models;

namespace Users.Services
{
  public interface IUserDatabaseService
  {
    IEnumerable<User> GetAllUsers();
    User GetUserByID(Guid id);
    User GetUserByEmail(string email);
    ResponseStatus CreateUser(User user);
    ResponseStatus UpdateUser(Guid id, UserUpdateDto newUser);
    bool SaveChanges();
  }
}
