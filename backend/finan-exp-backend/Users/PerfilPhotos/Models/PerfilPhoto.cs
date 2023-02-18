using Shared.Classes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Users.Models;

namespace Users.PerfilPhotos.Models
{
  [Table("PerfilPhotos")]
  public class PerfilPhoto: FullEntity
  {
    public string Name { get; set; }
    [Required]
    public string Data { get; set; }

  }
}
