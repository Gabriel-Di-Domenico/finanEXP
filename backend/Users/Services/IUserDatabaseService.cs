using backend.models;
using backend.Shared.Enums;
using backend.Users.Dtos;

namespace backend.Shared.Users.Services
{
  public interface IUserDatabaseService
  {
    IEnumerable<User> GetAllUsers();
    User GetUserByID(Guid id);
    User GetUserByEmail(string email);
    ResponseStatus CreateUser(User user);
    ResponseStatus UpdateUser(Guid id, UserUpdateDto newUser);

    ResponseStatus UpdatePerfilPhotoUser(Guid userId, Guid? perfilPhotoId);
    bool SaveChanges();
  }
}
