using Customers.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Users.Models;

namespace Customers.Models
{
  [Table("Customers")]
  public class Customer
  {
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    [ForeignKey("Users")]
    public Guid UserId { get; set; }
    public virtual User User { get; set; }

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
