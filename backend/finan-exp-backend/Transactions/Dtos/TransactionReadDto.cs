using Shared.Enums;

namespace Transactions.Dtos
{
  public class TransactionReadDto
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
