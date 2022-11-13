using backend.Customers.Enums;
using backend.models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Customers.Models
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
  }
}
