using backend.models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Users.PerfilPhotos.Models
{
  [Table("PerfilPhotos")]
  public class PerfilPhoto
  {
    [Key]
    public Guid Id { get; set; }
    public string Name { get; set; }
    [Required]
    public string Data { get; set; }

    [ForeignKey("User")]
    [Required]
    public Guid UserId { get; set; }

    public virtual User User { get; set; }

  }
}
