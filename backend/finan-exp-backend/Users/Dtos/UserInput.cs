using System.ComponentModel.DataAnnotations;
using Users.Models;

namespace Users.Dtos
{
  public class UserInput : IUserModel
  {

    [Required]
    [MaxLength(30)]
    public string Name { get; set; } = "";


    [Required]
    [MaxLength(256)]
    public string Email { get; set; } = "";

    [Required]
    [MaxLength(250)]
    public string Password { get; set; } = "";

    public string? NewPassword { get; set; }

  }
}
