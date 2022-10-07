using System.ComponentModel.DataAnnotations;

namespace backend.Categories.Models
{
  public class CategoryModel
  {
    [Required]
    Guid Id { get; set; }

    [Required]
    string Name { get; set; }
  }
}
