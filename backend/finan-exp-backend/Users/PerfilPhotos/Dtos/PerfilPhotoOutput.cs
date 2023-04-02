using PerfilPhotos.Models;

namespace Users.PerfilPhotos.Dtos
{
  public class PerfilPhotoOutput : IPerfilPhotoModel
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Data { get; set; }
  }
}
