using backend.models;
namespace backend.DataBase
{
  public interface IDataUser
  {
    IEnumerable<UserModel> GetAllUsers();
    UserModel GetUserByID(int id);
    UserModel GetUserByEmail(string email);
    void CreateUser(UserModel user);
    bool SaveChanges();
  }
}
