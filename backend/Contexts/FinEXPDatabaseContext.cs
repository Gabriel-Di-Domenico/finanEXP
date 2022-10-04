using backend.Customers.Models;
using backend.models;
using Microsoft.EntityFrameworkCore;

namespace backend.Contexts
{
  public class FinEXPDatabaseContext : DbContext
  {

    public FinEXPDatabaseContext(DbContextOptions<FinEXPDatabaseContext> opt) : base(opt)
    {
    }
    public DbSet<UserModel> Users { get; set; }
    public DbSet<CustomerModel> Customers { get; set; }

  }
}
