using Shared.Enums;

namespace Categories.Dtos
{
  public class CategoryReadDto
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public TransactionType TransactionType { get; set; }
  }
}
