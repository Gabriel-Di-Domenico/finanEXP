using System.ComponentModel.DataAnnotations;

namespace Authenticate.Dtos
{
  public class UserAuthDto
  {
    public string Name { get; set; } = "";

    public string Email { get; set; } = "";

    public string Password { get; set; } = "";

  }
}
