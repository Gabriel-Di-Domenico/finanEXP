using backend.Contexts;
using backend.Shared.Enums;
using backend.Shared.Users.Services;
using backend.Users.PerfilPhotos.Dtos;
using backend.Users.PerfilPhotos.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Users.PerfilPhotos.Services
{
  public class PerfilPhotoService : IPerfilPhotoService
  {
    private readonly FinEXPDatabaseContext _context;
    private readonly IUserDatabaseService _userDatabaseService;

    public PerfilPhotoService(FinEXPDatabaseContext context, IUserDatabaseService userDatabaseService)
    {
      _context = context;
      _userDatabaseService = userDatabaseService;
    }

    public IUserDatabaseService UserDatabaseService { get; }

    public ResponseStatus CreatePerfilPhoto(Guid userId, PerfilPhotoCreateDto newPerfilPhoto)
    {

      if (newPerfilPhoto.name != null && newPerfilPhoto.data != null)
      {
        PerfilPhoto perfilPhoto = new PerfilPhoto { Name = newPerfilPhoto.name, Data = newPerfilPhoto.data, UserId = userId };
        perfilPhoto.Id = new Guid();

        _context.PerfilPhotos.Add(perfilPhoto);

        _context.SaveChanges();
        return ResponseStatus.Ok;
      }
      else
      {
        return ResponseStatus.BadRequest;
      }
    }
    public async Task<ResponseStatus<PerfilPhoto>> GetPerfilPhoto(Guid userId)
    {
      PerfilPhoto perfilPhoto = _context.PerfilPhotos.FirstOrDefault(p => p.UserId == userId);

      return new ResponseStatus<PerfilPhoto> { Status = ResponseStatus.Ok, Content = perfilPhoto };
    }

    public async Task<ResponseStatus> DeletePerfilPhoto(Guid userId)
    {
      PerfilPhoto perfilPhoto = (await GetPerfilPhoto(userId)).Content;

      if (perfilPhoto.UserId == userId)
      {
        _context.PerfilPhotos.Remove(perfilPhoto);
        _context.SaveChanges();
        return ResponseStatus.Ok;
      }
      else
      {
        return ResponseStatus.BadRequest;
      }
    }

    public async Task<ResponseStatus> UpdatePerfilPhoto(Guid userId, PerfilPhotoCreateDto newPerfilPhoto)
    {
      var perfilPhoto = await GetPerfilPhoto(userId);

      perfilPhoto.Content.Name = newPerfilPhoto.name;
      perfilPhoto.Content.Data = newPerfilPhoto.data;

      _context.PerfilPhotos.Update(perfilPhoto.Content);
      _context.SaveChanges();

      return ResponseStatus.Ok;
    }

  }
}
