using Shared.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Users.Models;

namespace Shared.Classes
{
  public class FullEntity : Entity, IFullEntity
  {
    [Required]
    [ForeignKey("Users")]
    public Guid UserId { get; set; }

    public virtual User User { get; set; }
  }
}
