using backend.Customers.Enums;

namespace backend.Customers.Dtos
{
  public class CustomerUpdateDto
  {
    public string Name { get; set; }

    public CustomersTypeOptions Type { get; set; }

    public decimal Balance { get; set; }

  }
}
