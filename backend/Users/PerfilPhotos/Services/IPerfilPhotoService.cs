using backend.Shared.Enums;
using backend.Users.PerfilPhotos.Dtos;
using backend.Users.PerfilPhotos.Models;

namespace backend.Users.PerfilPhotos.Services
{
  public interface IPerfilPhotoService
  {
    ResponseStatus CreatePerfilPhoto(Guid userId, PerfilPhotoCreateDto archives);
    Task<ResponseStatus<PerfilPhoto>> GetPerfilPhoto(Guid id);
    Task<ResponseStatus> DeletePerfilPhoto(Guid userId, Guid perfilPhotoId);
    Task<ResponseStatus> UpdatePerfilPhoto(Guid perfilPhotoId, PerfilPhotoCreateDto archives);
  };
}
