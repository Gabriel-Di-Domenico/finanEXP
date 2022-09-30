using AutoMapper;
using backend.models;
using backend.Shared.Dtos;
using backend.UserSettings.Dtos;

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
