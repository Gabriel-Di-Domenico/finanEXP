using backend.models;

namespace backend.Shared.Users.Services
{
  public interface IUserDatabaseService
  {
    IEnumerable<UserModel> GetAllUsers();
    UserModel GetUserByID(int id);
    UserModel GetUserByEmail(string email);
    void CreateUser(UserModel user);
    bool SaveChanges();
  }
}
