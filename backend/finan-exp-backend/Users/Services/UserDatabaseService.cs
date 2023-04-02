using Authenticate.Services;
using AutoMapper;
using Contexts;
using Shared.Enums;
using Shared.Interfaces;
using Shared.Services;
using Users.Dtos;
using Users.Models;

namespace Users.Services
{
  public class UserDatabaseService : IUserDatabaseService
  {
    private readonly IAuthUserService _authUserService;
    private readonly IRepository<User> _repository;
    private readonly IMapper _mapper;

    public UserDatabaseService()
    {

    }
    public UserDatabaseService(IAuthUserService authUserService, IRepository<User> repository,
      IMapper mapper)
    {
      _authUserService = authUserService;
      _repository = repository;
      _mapper = mapper;
    }

    public async Task<ResponseStatus> CreateUser(UserInput input)
    {
      var verifyExistingUser = await _repository.FirstOrDefaultAsync(p => p.Email == input.Email);

      if (verifyExistingUser == null)
      {
        var user = _mapper.Map<User>(input);
        user.Password = Bcrypt.Encrypt(user.Password);

        await _repository.AddAsync(user, true);

        return ResponseStatus.Ok;
      }
      else
      {
        return ResponseStatus.AlreadyExists;
      }
    }

    public async Task<List<User>> GetAllUsers()
    {
      return await _repository.ToListAsync();
    }

    public async Task<User?> GetUserByID(Guid id)
    {
      return await _repository.FirstOrDefaultAsync(p => p.Id == id);
    }
    public async Task<User?> GetUserByEmail(string email)
    {
      return await _repository.FirstOrDefaultAsync(p => p.Email == email);
    }

    public async Task<ResponseStatus> UpdateUser(Guid id, UserInput input)
    {
      var verifyExistingUser = await _repository.FirstOrDefaultAsync(p => p.Email == input.Email);

      if (verifyExistingUser == null || verifyExistingUser.Id == id)
      {
        var userFromDataBase = await _repository.FirstOrDefaultAsync(p => p.Id == id);

        userFromDataBase.Email = input.Email;
        userFromDataBase.Name = input.Name;

        if (input.NewPassword != null)
        {
          var authenticatedPassword = _authUserService.AuthenticatePasswords(input.Password, userFromDataBase.Password);

          if (authenticatedPassword)
          {
            var newPassword = Bcrypt.Encrypt(input.NewPassword);
            userFromDataBase.Password = newPassword;
          }
          else
          {
            return ResponseStatus.Unauthorized;
          }
        }

        _repository.Update(userFromDataBase, true);

        return ResponseStatus.Ok;
      }
      else
      {
        return ResponseStatus.AlreadyExists;
      }
    }

    public User? SyncGetUserByID(Guid id)
    {
      return _repository.FirstOrDefault(user => user.Id == id);
    }
  }
}
