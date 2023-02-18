using Customers.Enums;
using Customers.Models;

namespace Customers.Dtos
{
  public class CustomerReadDto
  {
    public Guid Id { get; set; }
    public string Name { get; set; }

    public CustomersTypeOptions Type { get; set; }

    public decimal InitialBalance { get; set; }

    public decimal ActualBalance { get; set; }

    public bool IsArchived { get; set; }
  }
}
