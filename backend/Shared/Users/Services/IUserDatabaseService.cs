using backend.models;

namespace backend.Shared.Users.Services
{
  public interface IUserDatabaseService
  {
    IEnumerable<User> GetAllUsers();
    User GetUserByID(Guid id);
    User GetUserByEmail(string email);
    bool CreateUser(User user);
    bool SaveChanges();
  }
}
