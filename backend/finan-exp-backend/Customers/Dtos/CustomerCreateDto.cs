using Customers.Enums;

namespace Customers.Dtos
{
  public class CustomerCreateDto
  {
    public string Name { get; set; }

    public CustomersTypeOptions Type { get; set; }

    public decimal InitialBalance { get; set; }

  }
}
