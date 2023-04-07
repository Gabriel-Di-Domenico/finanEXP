using Classes;
using Contexts;
using Microsoft.EntityFrameworkCore;
using Shared.Interfaces;

namespace Supports.RepositoryProvider
{
  public class RepositoryProvider : IRepositoryProvider
  {
    public readonly FinEXPDatabaseContext context;
    public RepositoryProvider()
    {
      DbContextOptionsBuilder dbOptions = new DbContextOptionsBuilder()
        .UseInMemoryDatabase(Guid.NewGuid().ToString());
      context = new FinEXPDatabaseContext(dbOptions.Options);

    }
    public IRepository<T> GetRepository<T>() where T : class
    {
      return new Repository<T>(context);
    }
  }
}
