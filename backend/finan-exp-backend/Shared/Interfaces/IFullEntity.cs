using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Users.Models;

namespace Shared.Interfaces
{
  public interface IFullEntity : IEntity
  {
    public Guid UserId { get; set; }
  }
}
