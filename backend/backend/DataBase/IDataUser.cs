using backend.dtos;
using backend.models;
namespace backend.DataBase
{
  public interface IDataUser
  {
    IEnumerable<UserModel> GetAllUsers();
    UserModel GetUserByID(int id);
    UserModel GetUserByEmail(string email);
    UserModel UpdateUser(int id, UserUpdateDto user);
    UserModel UpdateUserPassword(int id, UpdatePasswordDto passwordConfigs);
    void CreateUser(UserModel user);
    bool SaveChanges();
  }
}
