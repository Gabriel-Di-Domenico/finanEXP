using Shared.Enums;
using System.ComponentModel.DataAnnotations;
using Transactions.Models;

namespace Transactions.Dtos
{
  public class TransactionInput : ITransactionModel
  {
    [MaxLength(100)]
    public string? Description { get; set; }

    [Required]
    public decimal Value { get; set; }

    public Guid? CategoryId { get; set; }

    [Required]

    public Guid ReceiverCustomerId { get; set; }

    public Guid? SenderCustomerId { get; set; }

    [Required]
    public TransactionType TransactionType { get; set; }

    [Required]
    public DateTime Date { get; set; }
  }
}
