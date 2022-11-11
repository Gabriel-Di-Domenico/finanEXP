using backend.Shared.Enums;

namespace backend.Shared.Classes
{
  public class GetAllFilter
  {
    public TransactionType? TransactionType { get; set; }
    public bool? IsArchived { get; set;}

    public Guid? CustomerId { get; set; }
  }
 
}
