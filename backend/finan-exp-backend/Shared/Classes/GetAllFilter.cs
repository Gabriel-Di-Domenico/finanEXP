using Shared.Enums;

namespace Shared.Classes
{
  public class GetAllFilter
  {
    public TransactionType? TransactionType { get; set; }
    public bool? IsArchived { get; set; }

    public Guid? CustomerId { get; set; }

    public List<Guid>? CustomersIds { get; set; }

  }

}
