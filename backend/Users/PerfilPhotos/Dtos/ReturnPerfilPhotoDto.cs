using backend.Shared.Dtos;

namespace backend.Users.PerfilPhotos.Dtos
{
  public class ReturnPerfilPhotoDto : ReturnDto
  {
    public PerfilPhotoReadDto PerfilPhoto { get; set; }
  }
}
