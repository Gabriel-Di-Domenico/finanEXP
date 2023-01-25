using System.ComponentModel.DataAnnotations;

namespace Users.Dtos
{
  public class UserUpdateDto
  {
    [Required]
    public string name { get; set; } = "";

    [Required]
    public string email { get; set; } = "";

    public string? password { get; set; }

    public string? NewPassword { get; set; }

  }
}
