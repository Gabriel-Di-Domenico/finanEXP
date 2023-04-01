using AutoMapper;
using Users.Dtos;
using Users.Models;

namespace Users.Profiles
{
  public class UsersProfile : Profile
  {
    public UsersProfile()
    {
      CreateMap<User, UserOutput>();
      CreateMap<UserInput, User>();
      CreateMap<User, UserInput>();
    }
  }
}
