using Customers.Enums;

namespace Customers.Models
{
  public interface ICustomerModel
  {
    public string Name { get; set; }

    public CustomersTypeOptions Type { get; set; }

    public decimal InitialBalance { get; set; }

    public decimal ActualBalance { get; set; }

    public decimal TransferValue { get; set; }

    public bool IsArchived { get; set; }
  }
}
