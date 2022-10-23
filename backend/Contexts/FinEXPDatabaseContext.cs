using backend.Customers.Models;
using backend.models;
using backend.Users.PerfilPhotos.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Contexts
{
  public class FinEXPDatabaseContext : DbContext
  {

    public FinEXPDatabaseContext(DbContextOptions<FinEXPDatabaseContext> opt) : base(opt)
    {
    }
    public DbSet<User> Users { get; set; }
    public DbSet<Customer> Customers { get; set; }

    public DbSet<PerfilPhoto> PerfilPhotos { get; set; }

  }
}
