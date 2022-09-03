using System.ComponentModel.DataAnnotations;

namespace backend.models
{
  public class UserOutput
  {
    public string name { get; set; } = "";

    [Required]
    public string email { get; set; } = "";
    
  }
}
