using AutoMapper;
using Users.Dtos;
using Users.Models;

namespace Users.Profiles
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
