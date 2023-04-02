using Shared.Enums;
using Users.PerfilPhotos.Dtos;
using Users.PerfilPhotos.Models;

namespace Users.PerfilPhotos.Services
{
  public interface IPerfilPhotoService
  {
    Task<ResponseStatus> CreatePerfilPhoto(PerfilPhotoInput newPerfilPhoto);
    Task<ResponseStatus<PerfilPhoto>> GetPerfilPhoto();
    Task<ResponseStatus> DeletePerfilPhoto();
    Task<ResponseStatus> UpdatePerfilPhoto(PerfilPhotoInput newPerfilPhoto);
  };
}
