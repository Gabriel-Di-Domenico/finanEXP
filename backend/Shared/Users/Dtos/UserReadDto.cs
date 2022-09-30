using System.Collections;
using System.Text;

namespace backend.Shared.Dtos
{
  public class UserReadDto
  {
    public int ID { get; set; } = 0;

    public string name { get; set; } = "";

    public string email { get; set; } = "";

    public string? perfilPhoto { get; set; }

    public UserReadDto(int iD, string name, string email, byte[]? perfilPhoto)
    {
      ID = iD;
      this.name = name;
      this.email = email;
      this.perfilPhoto = Encoding.UTF8.GetString(perfilPhoto);
    }
  }
}
