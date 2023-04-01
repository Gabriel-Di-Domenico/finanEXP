using Shared.Enums;
using Users.Dtos;
using Users.Models;

namespace Users.Services
{
  public interface IUserDatabaseService
  {
    Task<List<User>> GetAllUsers();
    Task<User?> GetUserByID(Guid id);
    User? SyncGetUserByID(Guid id);
    Task<User?> GetUserByEmail(string email);
    Task<ResponseStatus> CreateUser(UserInput input);
    Task<ResponseStatus> UpdateUser(Guid id, UserInput input);
  }
}
