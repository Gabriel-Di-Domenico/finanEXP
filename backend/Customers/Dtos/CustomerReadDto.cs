using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Customers.Dtos
{
  public class CustomerReadDto
  {
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Name { get; set; }

    public string Type { get; set; }

    public decimal Balance { get; set; }
  }
}
