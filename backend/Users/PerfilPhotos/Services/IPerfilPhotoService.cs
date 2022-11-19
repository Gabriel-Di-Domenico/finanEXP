using backend.Shared.Enums;
using backend.Users.PerfilPhotos.Dtos;
using backend.Users.PerfilPhotos.Models;

namespace backend.Users.PerfilPhotos.Services
{
  public interface IPerfilPhotoService
  {
    ResponseStatus CreatePerfilPhoto(Guid userId, PerfilPhotoCreateDto archives);
    Task<ResponseStatus<PerfilPhoto>> GetPerfilPhoto(Guid userId);
    Task<ResponseStatus> DeletePerfilPhoto(Guid userId);
    Task<ResponseStatus> UpdatePerfilPhoto(Guid userId, PerfilPhotoCreateDto newPerfilPhoto);
  };
}
