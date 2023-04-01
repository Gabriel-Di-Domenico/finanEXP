using Contexts;
using Microsoft.EntityFrameworkCore;
using Shared.Classes;
using Shared.Extensions;
using Shared.Interfaces;
using System.Linq.Expressions;
using Users.Models;

namespace Classes
{
  public class Repository<T> : IRepository<T> where T : class
  {
    private readonly FinEXPDatabaseContext _context;
    private User CurrentUser { get;}

    public Repository(FinEXPDatabaseContext context)
    {
      _context = context;
    }
    public IQueryable<T> Query
    {
      get { return _context.Set<T>();}
    }

    public void Remove(T entity, bool autoSave = false)
    {
       _context.Set<T>().Remove(entity);
      
      if (autoSave)
      {
        SaveChanges();
      }
    }
    public Task<List<T>> ToListAsync()
    {
      return Query.ToListAsync();
    }
    public async Task AddAsync(T entity, bool autoSave = false)
    {
      await _context.Set<T>().AddAsync(entity);

      if (autoSave)
      {
        await _context.SaveChangesAsync();
      }
    }

    public void Update(T entity, bool autoSave = false)
    {
     
      _context.Set<T>().Update(entity);
      

      if (autoSave)
      {
        SaveChanges();
      }
    }
    public IQueryable<T> Where(Expression<Func<T, bool>> predicate)
    {
      return Query.Where(predicate);
    }

    public Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate)
    {
      return Query.FirstOrDefaultAsync(predicate);
    }
    public Task<bool> AnyAsync(Expression<Func<T, bool>> predicate)
    {
      return Query.AnyAsync(predicate);
    }
    public void SaveChanges()
    {
      _context.SaveChanges();
    }

    public IQueryable<T> WhereIf(bool condition, Expression<Func<T, bool>> predicate)
    {
      if (condition)
      {
        return Query.Where(predicate);
      }else
      {
        return Query;
      }
    }

    public Task<T?> FirstOrDefaultAsync()
    {
      return Query.FirstOrDefaultAsync();
    }
    public T? FirstOrDefault(Expression<Func<T, bool>> predicate)
    {
      return Query.FirstOrDefault(predicate);
    }
  }
}
