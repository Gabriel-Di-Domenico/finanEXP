using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Customers.Dtos
{
  public class CustomerReadDto
  {
    public string Name { get; set; }

    public Guid UserId { get; set; }

    public string Type { get; set; }

    public int Balance { get; set; } = 0;
  }
}
