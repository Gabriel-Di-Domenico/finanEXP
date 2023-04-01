using Categories.Models;
using Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace Categories.Dtos
{
  public class CategoryInput : ICategoryModel
  {
    [Required]
    public string Name { get; set; }

    [Required]
    public TransactionType TransactionType { get; set; }

    public bool? IsArchived { get; set; }
    bool ICategoryModel.IsArchived { get; set; }
  }
}
