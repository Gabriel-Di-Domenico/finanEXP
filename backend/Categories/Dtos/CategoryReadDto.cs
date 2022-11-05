using backend.Shared.Enums;

namespace backend.Categories.Dtos
{
  public class CategoryReadDto
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public TransactionType TransactionType { get; set; }
  }
}
