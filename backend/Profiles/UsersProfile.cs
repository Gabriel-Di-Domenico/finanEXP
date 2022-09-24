using AutoMapper;
using backend.dtos;
using backend.models;

namespace backend.Profiles
{
  public class UsersProfile : Profile
  {
    public UsersProfile()
    {
      CreateMap<UserModel, UserReadDto>();
      CreateMap<UserCreateDto, UserModel>();
      CreateMap<UserUpdateDto, UserModel>();
      CreateMap<UserModel, UserUpdateDto>();
    }
  }
}
