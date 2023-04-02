using Shared.Enums;

namespace Categories.Models
{
  public interface ICategoryModel
  {
    public string Name { get; set; }
    public TransactionType TransactionType { get; set; }
    public bool IsArchived { get; set; }
  }
}
