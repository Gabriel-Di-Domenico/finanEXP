using PerfilPhotos.Models;

namespace Users.PerfilPhotos.Dtos
{
  public class PerfilPhotoInput : IPerfilPhotoModel
  {
    public string Name { get; set; }
    public string Data { get; set; }
  }
}

