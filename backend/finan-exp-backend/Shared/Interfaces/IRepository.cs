using System.Linq.Expressions;

namespace Shared.Interfaces
{
  public interface IRepository<T> where T : class

  {
    IQueryable<T> Query { get; }
    public  Task<List<T>> ToListAsync();
    public void Remove(T entity, bool autoSave = false);

    public Task AddAsync(T entity, bool autoSave = false);

    public void Update(T entity, bool autoSave = false);

    public IQueryable<T> Where(Expression<Func<T, bool>> predicate);
    public IQueryable<T> WhereIf(bool condition, Expression<Func<T, bool>> predicate);

    Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate);
    Task<T?> FirstOrDefaultAsync();
    T? FirstOrDefault(Expression<Func<T, bool>> predicate);

    Task<bool> AnyAsync(Expression<Func<T, bool>> predicate);

    void SaveChanges();
  }
}
