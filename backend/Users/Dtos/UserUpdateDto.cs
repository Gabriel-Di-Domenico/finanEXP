using System.ComponentModel.DataAnnotations;

namespace backend.Users.Dtos
{
  public class UserUpdateDto
  {
    [Required]
    public string name { get; set; } = "";

    [Required]
    public string email { get; set; } = "";

    public string? password { get; set; } = "";

    public string? NewPassword { get; set; }

    public string? perfilPhoto { get; set; }
  }
}
