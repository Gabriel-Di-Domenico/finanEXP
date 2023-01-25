using System.ComponentModel.DataAnnotations;

namespace Users.Dtos
{
  public class UserCreateDto
  {

    [Required]
    [MaxLength(30)]
    public string name { get; set; } = "";


    [Required]
    [MaxLength(256)]
    public string email { get; set; } = "";

    [Required]
    [MaxLength(250)]
    public string password { get; set; } = "";

  }
}
