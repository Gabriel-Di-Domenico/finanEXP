using Shared.Enums;
using Shared.Interfaces;
using Users.PerfilPhotos.Dtos;
using Users.PerfilPhotos.Models;
using Users.Services;

namespace Users.PerfilPhotos.Services
{
  public class PerfilPhotoService : IPerfilPhotoService
  {
    public IUserDatabaseService UserDatabaseService { get; }
    public IRepository<PerfilPhoto> _repository { get; }

    public PerfilPhotoService(IRepository<PerfilPhoto> repository)
    {
      _repository = repository;
    }

    public async Task<ResponseStatus> CreatePerfilPhoto(PerfilPhotoInput newPerfilPhoto)
    {
      if (newPerfilPhoto.Name != null && newPerfilPhoto.Data != null)
      {
        PerfilPhoto perfilPhoto = new PerfilPhoto { Name = newPerfilPhoto.Name, Data = newPerfilPhoto.Data };
        perfilPhoto.Id = new Guid();

        await _repository.AddAsync(perfilPhoto, true);

        return ResponseStatus.Ok;
      }
      else
      {
        return ResponseStatus.BadRequest;
      }
    }
    public async Task<ResponseStatus<PerfilPhoto>> GetPerfilPhoto()
    {
      var perfilPhoto = await _repository.FirstOrDefaultAsync();

      return new ResponseStatus<PerfilPhoto> { Status = ResponseStatus.Ok, Content = perfilPhoto };
    }

    public async Task<ResponseStatus> DeletePerfilPhoto()
    {
      var perfilPhoto = await _repository.FirstOrDefaultAsync();

      _repository.Remove(perfilPhoto, true);

      return ResponseStatus.Ok;
    }

    public async Task<ResponseStatus> UpdatePerfilPhoto(PerfilPhotoInput newPerfilPhoto)
    {
      var perfilPhoto = await _repository.FirstOrDefaultAsync();

      perfilPhoto.Name = newPerfilPhoto.Name;
      perfilPhoto.Data = newPerfilPhoto.Data;

      _repository.Update(perfilPhoto, true);

      return ResponseStatus.Ok;
    }

  }
}
