using Shared.Interfaces;

namespace Supports.RepositoryProvider
{
  public interface IRepositoryProvider
  {
    public IRepository<T> GetRepository<T>() where T : class;
  }
}
