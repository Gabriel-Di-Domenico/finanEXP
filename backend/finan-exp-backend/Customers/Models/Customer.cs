using Customers.Enums;
using Shared.Classes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Customers.Models
{
  [Table("Customers")]
  public class Customer: FullEntity
  {
    [Required]
    public string Name { get; set; }

    [Required]
    public CustomersTypeOptions Type { get; set; }

    [Required]
    public decimal InitialBalance { get; set; }

    [Required]
    public decimal ActualBalance { get; set; }

    [Required]
    public decimal TransferValue { get; set; }

    [Required]
    public bool IsArchived { get; set; }
  }
}
