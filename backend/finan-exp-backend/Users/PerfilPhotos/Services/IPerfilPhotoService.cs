using Shared.Enums;
using Users.PerfilPhotos.Dtos;
using Users.PerfilPhotos.Models;

namespace Users.PerfilPhotos.Services
{
  public interface IPerfilPhotoService
  {
    ResponseStatus CreatePerfilPhoto(Guid userId, PerfilPhotoCreateDto archives);
    Task<ResponseStatus<PerfilPhoto>> GetPerfilPhoto(Guid userId);
    Task<ResponseStatus> DeletePerfilPhoto(Guid userId);
    Task<ResponseStatus> UpdatePerfilPhoto(Guid userId, PerfilPhotoCreateDto newPerfilPhoto);
  };
}
