using System.ComponentModel.DataAnnotations;

namespace backend.models
{
  public class UserOutput
  {
    public string ID { get; set; } = "";
    public string name { get; set; } = "";

    [Required]
    public string email { get; set; } = "";

  }
}
