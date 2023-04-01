using Authenticate.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Shared.Classes;
using Users.Models;

namespace Shared.Interceptors
{
  public class AddEntityInterceptor : SaveChangesInterceptor
  {
    public IHttpContextAccessor _accessor { get; }
    public AddEntityInterceptor(IHttpContextAccessor accessor)
    {
      _accessor = accessor;
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
    {
      DbContext? context = eventData.Context;
      if (context == null)
      {
        return base.SavingChangesAsync(eventData, result, cancellationToken);
      }
      var entries = context.ChangeTracker.Entries<FullEntity>();

      foreach (var entry in entries)
      {
        if (entry.State == EntityState.Added)
        {
          var currentUser = GetCurrentUser(context);

          entry.Property(a => a.UserId).CurrentValue = currentUser.Id;
        }
      }

      return base.SavingChangesAsync(eventData, result, cancellationToken);
    }
    private User GetCurrentUser(DbContext context)
    {
      var Bearertoken = _accessor.HttpContext.Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));

      return context.Set<User>().FirstOrDefault(user => user.Id == userId);
    }
  }
}
