using backend.Categories.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Revenues.Models
{
  public class RevenueModel
  {
    [Required]
    Guid Id { get; set; }

    [Required]
    int Value { get; set; }

    Byte[] Description { get; set; }

    [Required]
    [ForeignKey("Custumer")]
    int CarteiraId { get; set; }

    [Required]
    DateTime Date { get; set; }

    [Required]
    CategoryModel Category { get; set; }
  }
}
