using System.ComponentModel.DataAnnotations;

namespace backend.UserSettings.Dtos
{
  public class UserUpdateDto
  {
    [Required]
    public string name { get; set; } = "";

    [Required]
    public string email { get; set; } = "";

    public string? password { get; set; } = "";

    public string? perfilPhoto { get; set; }
  }
}
