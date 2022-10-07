using backend.models;

namespace backend.Shared.Users.Services
{
  public interface IUserDatabaseService
  {
    IEnumerable<UserModel> GetAllUsers();
    UserModel GetUserByID(Guid id);
    UserModel GetUserByEmail(string email);
    bool CreateUser(UserModel user);
    bool SaveChanges();
  }
}
