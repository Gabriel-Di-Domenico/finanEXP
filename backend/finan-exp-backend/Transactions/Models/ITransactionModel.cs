using Shared.Enums;

namespace Transactions.Models
{
  public interface ITransactionModel
  {
    public string? Description { get; set; }
    public decimal Value { get; set; }
    public DateTime Date { get; set; }
    public Guid? CategoryId { get; set; }
    public Guid ReceiverCustomerId { get; set; }
    public Guid? SenderCustomerId { get; set; }
    public TransactionType TransactionType { get; set; }
  }
}
