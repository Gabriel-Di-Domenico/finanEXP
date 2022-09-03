using backend.models;
using Microsoft.EntityFrameworkCore;

namespace backend.DataBase
{
  public class UserContext : DbContext
  {

    public UserContext(DbContextOptions<UserContext> options) : base(options)
    {

    }
    public DbSet<UserModel> Users { get; set; } 
  }
}