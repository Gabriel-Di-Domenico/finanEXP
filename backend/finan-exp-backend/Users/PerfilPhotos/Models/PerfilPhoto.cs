using PerfilPhotos.Models;
using Shared.Classes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Users.PerfilPhotos.Models
{
  [Table("PerfilPhotos")]
  public class PerfilPhoto: FullEntity, IPerfilPhotoModel
  {
    public string Name { get; set; }
    [Required]
    public string Data { get; set; }

  }
}
