using backend.Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace backend.Transactions.Dtos
{
  public class TransactionCreateDto
  {
    public string Description { get; set; }

    [Required]
    public decimal Value { get; set; }

    [Required]
    public Guid CategoryId { get; set; }

    [Required]

    public Guid CustomerId { get; set; }

    [Required]
    public TransactionType TransactionType { get; set; }
  }
}
