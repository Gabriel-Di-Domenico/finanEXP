using System.ComponentModel.DataAnnotations;

namespace backend.dtos
{
  public class UserAuthDto
  {
    public string name { get; set; } = "";

    public string email { get; set; } = "";

    public string password { get; set; } = "";

  }
}
