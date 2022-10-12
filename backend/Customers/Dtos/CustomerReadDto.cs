using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using backend.Customers.Enums;
using System.Reflection.Emit;

namespace backend.Customers.Dtos
{
  public class CustomerReadDto
  {
    public Guid Id { get; set; }
    public string Name { get; set; }

    public int Type { get; set; }

    public decimal Balance { get; set; }
  }
}
