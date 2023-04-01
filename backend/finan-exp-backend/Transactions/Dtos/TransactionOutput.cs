using Shared.Enums;
using Transactions.Models;

namespace Transactions.Dtos
{
  public class TransactionOutput : ITransactionModel
  {
    public Guid Id { get; set; }
    public string Description { get; set; }

    public DateTime Date { get; set; }

    public decimal Value { get; set; }

    public Guid? CategoryId { get; set; }

    public Guid ReceiverCustomerId { get; set; }

    public Guid? SenderCustomerId { get; set; }

    public TransactionType TransactionType { get; set; }
  }
}
