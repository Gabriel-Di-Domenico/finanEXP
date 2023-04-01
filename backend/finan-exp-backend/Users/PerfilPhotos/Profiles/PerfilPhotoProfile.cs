using AutoMapper;
using Users.PerfilPhotos.Dtos;
using Users.PerfilPhotos.Models;

namespace Users.PerfilPhotos.Profiles
{
  public class PerfilPhotoProfile : Profile
  {
    public PerfilPhotoProfile()
    {
      CreateMap<PerfilPhoto, PerfilPhotoOutput>();
    }
  }
}
