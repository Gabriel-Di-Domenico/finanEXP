using System.Collections;
using System.Text;

namespace backend.Shared.Dtos
{
  public class UserReadDto
  {
    public Guid ID { get; set; }

    public string name { get; set; } = "";

    public string email { get; set; } = "";

    public string? perfilPhoto { get; set; }

    public UserReadDto(Guid iD, string name, string email, byte[]? perfilPhoto)
    {
      ID = iD;
      this.name = name;
      this.email = email;
      this.perfilPhoto = Encoding.UTF8.GetString(perfilPhoto);
    }
  }
}
