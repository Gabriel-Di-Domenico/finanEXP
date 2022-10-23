using AutoMapper;
using backend.Users.PerfilPhotos.Dtos;
using backend.Users.PerfilPhotos.Models;

namespace backend.Users.PerfilPhotos.Profiles
{
  public class PerfilPhotoProfile : Profile
  {
    public PerfilPhotoProfile()
    {
       CreateMap<PerfilPhoto, PerfilPhotoReadDto>();
    }
  }
}
