using Customers.Enums;

namespace Customers.Dtos
{
  public class CustomerUpdateDto
  {
    public string Name { get; set; }

    public CustomersTypeOptions Type { get; set; }

    public decimal InitialBalance { get; set; }

    public decimal ActualBalance { get; set; }

    public bool IsArchived { get; set; }

  }
}
