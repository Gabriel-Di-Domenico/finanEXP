using backend.Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace backend.Categories.Dtos
{
  public class CategoryCreateDto
  {
    [Required]
    public string Name{ get;set;}

    [Required]
    public TransactionType TransactionType { get; set; }
  }
}
