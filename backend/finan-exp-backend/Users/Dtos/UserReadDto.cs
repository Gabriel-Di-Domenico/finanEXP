using System.Text;

namespace Users.Dtos
{
  public class UserReadDto
  {
    public Guid Id { get; set; }

    public string Name { get; set; } = "";

    public string Email { get; set; } = "";

  }
}
