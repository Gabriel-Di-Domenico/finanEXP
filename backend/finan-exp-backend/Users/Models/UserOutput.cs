using System.ComponentModel.DataAnnotations;

namespace Users.Models
{
  public class UserOutput
  {
    public string ID { get; set; } = "";
    public string name { get; set; } = "";

    [Required]
    public string email { get; set; } = "";

  }
}
