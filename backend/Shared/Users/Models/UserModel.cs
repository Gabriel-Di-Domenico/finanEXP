using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.models
{
  [Table("Users")]
  public class UserModel
  {
    [Key]
    public int ID { get; set; }

    [Required]
    [MaxLength(256)]
    public string name { get; set; } = "";

    
    [Required]
    [MaxLength(256)]
    public string email { get; set; } = "";

    [Required]
    [MaxLength(250)]
    public string password { get; set; } = "";

    public Byte[]? perfilPhoto { get; set; }

  }
}
