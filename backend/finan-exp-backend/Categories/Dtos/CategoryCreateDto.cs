using Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace Categories.Dtos
{
  public class CategoryCreateDto
  {
    [Required]
    public string Name { get; set; }

    [Required]
    public TransactionType TransactionType { get; set; }

    public bool? IsArchived { get; set; }
  }
}
