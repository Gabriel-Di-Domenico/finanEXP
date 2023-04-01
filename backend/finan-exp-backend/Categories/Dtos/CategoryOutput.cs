using Categories.Models;
using Shared.Enums;

namespace Categories.Dtos
{
  public class CategoryOutput : ICategoryModel
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public TransactionType TransactionType { get; set; }
    public bool IsArchived { get ; set ; }
  }
}
