using backend.Customers.Models;
using backend.Expenses.Models;
using backend.Revenues.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Custumers.Models
{
  public class CustomerModel
  {
    [Key]
    Guid Id { get; set; }

    [Required]
    string Name { get; set; }

    [Required]
    [ForeignKey("User")]
    int UserId { get; set; }

    [Required]
    CustumerTypes Type { get; set; }

    [Required]
    int Saldo { get; set; } = 0;

  }
}
