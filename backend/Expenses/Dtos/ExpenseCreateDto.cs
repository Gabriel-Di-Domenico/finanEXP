using System.ComponentModel.DataAnnotations;

namespace backend.Expenses.Dtos
{
  public class ExpenseCreateDto
  {
    public string Description { get; set; }

    [Required]
    public decimal Value { get; set; }

    [Required]
    public Guid CategoryId { get; set; }

    [Required]

    public Guid CustomerId { get; set; }
  }
}
