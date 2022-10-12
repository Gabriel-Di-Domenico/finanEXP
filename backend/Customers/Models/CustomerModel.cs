using backend.Customers.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Customers.Models
{
  [Table("Customers")]
  public class CustomerModel
  {
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    [ForeignKey("User")]
    public Guid UserId { get; set; }

    [Required]
    public CustomersTypeOptions Type { get; set; }

    [Required]
    public decimal Balance { get; set; } = 0;
  }
}
