using Shared.Classes;
using Shared.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Categories.Models
{
  [Table("Categories")]
  public class Category : FullEntity, ICategoryModel
  {
    [Required]
    public string Name { get; set; }
    [Required]
    public TransactionType TransactionType { get; set; }

    [Required]
    public bool IsArchived { get; set; }

  }
}
