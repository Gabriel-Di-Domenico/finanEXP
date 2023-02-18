using Shared.Classes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Users.Models
{
  [Table("Users")]
  public class User: Entity
  {
    [Required]
    [MaxLength(256)]
    public string Name { get; set; } = "";


    [Required]
    [MaxLength(256)]
    public string Email { get; set; } = "";

    [Required]
    [MaxLength(250)]
    public string Password { get; set; } = "";

  }
}
