using AutoMapper;
using backend.models;
using backend.Shared.Dtos;
using backend.Users.Dtos;

namespace backend.Profiles
{
  public class UsersProfile : Profile
  {
    public UsersProfile()
    {
      CreateMap<User, UserReadDto>();
      CreateMap<UserCreateDto, User>();
      CreateMap<UserUpdateDto, User>();
      CreateMap<User, UserUpdateDto>();
    }
  }
}
