using Microsoft.EntityFrameworkCore;
using Customers.Models;
using Users.Models;
using Categories.Models;
using Users.PerfilPhotos.Models;
using Transactions.Models;
using Shared.Classes;

namespace Contexts
{
  public class FinEXPDatabaseContext : DbContext
  {
    public DbSet<User> Users { get; set; }
    public DbSet<Customer> Customers { get; set; }

    public DbSet<PerfilPhoto> PerfilPhotos { get; set; }

    public DbSet<Category> Categories { get; set; }

    public DbSet<Transaction> Transactions { get; set; }
    public CurrentUserProvider _currentUserProvider { get; }
    public User currentUser { get; set; }
    public IHttpContextAccessor _accessor { get; }

    public FinEXPDatabaseContext(DbContextOptions opt) : base(opt)
    {
    }
  }
}
