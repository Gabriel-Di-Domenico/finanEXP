using System.ComponentModel.DataAnnotations;

namespace backend.Categories.Dtos
{
  public class CategoryCreateDto
  {
    [Required]
    public string Name{ get;set;}
  }
}
