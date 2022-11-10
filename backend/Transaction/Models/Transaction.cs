using backend.Categories.Models;
using backend.Customers.Models;
using backend.models;
using backend.Shared.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Transactions.Models
{
  [Table("Transactions")]
  public class Transaction
  {
    [Required]
    public Guid Id { get; set; }

    public Byte[] Description { get; set; }

    [Required]
    public decimal Value { get; set; }

    [Required]
    public DateTime Date { get; set; }

    [Required]
    [ForeignKey("Category")]
    public Guid CategoryId { get; set; }
    public virtual Category Category { get; set; }

    [Required]
    [ForeignKey("Custumer")]
    public Guid CustomerId { get; set; }

    public virtual Customer Customer { get; set; }

    [Required]
    public TransactionType TransactionType { get; set; }
  }
}
