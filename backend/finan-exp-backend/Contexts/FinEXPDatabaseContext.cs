using Microsoft.EntityFrameworkCore;
using Customers.Models;
using Users.Models;
using Categories.Models;
using Users.PerfilPhotos.Models;
using Transactions.Models;

namespace Contexts
{
  public class FinEXPDatabaseContext : DbContext
  {

    public FinEXPDatabaseContext(DbContextOptions<FinEXPDatabaseContext> opt) : base(opt)
    {
    }
    public DbSet<User> Users { get; set; }
    public DbSet<Customer> Customers { get; set; }

    public DbSet<PerfilPhoto> PerfilPhotos { get; set; }

    public DbSet<Category> Categories { get; set; }

    public DbSet<Transaction> Transactions { get; set; }

  }
}
