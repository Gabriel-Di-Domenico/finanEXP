namespace backend.Expenses.Dtos
{
  public class ExpenseReadDto
  {
    public Guid Id { get; set; }
    public string Description { get; set; }

    public DateTime Date { get; set; }

    public decimal Value { get; set; }

    public Guid CategoryId { get; set; }

    public Guid CustomerId { get; set; }
  }
}
