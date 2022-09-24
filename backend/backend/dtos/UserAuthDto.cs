using System.ComponentModel.DataAnnotations;

namespace backend.dtos
{
  public class UserAuthDto
  {
    public string name { get; set; } = "";

    [Required]
    public string email { get; set; } = "";

    [Required]
    public string password { get; set; } = "";
  }
}
