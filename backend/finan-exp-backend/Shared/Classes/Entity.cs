using Shared.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Shared.Classes
{
  public class Entity : IEntity
  {
    [Key]
    public Guid Id { get; set; }
  }
}
