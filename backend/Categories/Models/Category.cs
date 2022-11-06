using backend.models;
using backend.Shared.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Categories.Models
{
  [Table("Categories")]
  public class Category
  {
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Name { get; set; }
    [Required]
    public TransactionType TransactionType { get; set; }

    [Required]
    public bool IsArchived { get; set; }
    
    [Required]
    [ForeignKey("Users")]
    public Guid UserId { get; set; }
    public virtual User User { get; set; }

  }
}
