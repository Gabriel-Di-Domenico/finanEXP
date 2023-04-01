using Authenticate.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System.Data.Common;
using System.Text;
using Users.Models;

namespace Shared.Interceptors
{
  public class QueryInterceptor : DbCommandInterceptor
  {
    private readonly IHttpContextAccessor _accessor;

    public QueryInterceptor(IHttpContextAccessor accessor)
    {
      _accessor = accessor;
    }

    public override ValueTask<InterceptionResult<DbDataReader>> ReaderExecutingAsync(DbCommand command, CommandEventData eventData, InterceptionResult<DbDataReader> result, CancellationToken cancellationToken = default)
    {
      if(command.CommandText.StartsWith("SELECT")) {
        var entityHasUserId = EntityHasUserId(command, eventData);
        if (entityHasUserId)
        {
          AddUserIdFilter(command, eventData);
        }
      }
      
      return base.ReaderExecutingAsync(command, eventData, result, cancellationToken);
    }
    private void AddUserIdFilter(DbCommand command, CommandEventData eventData)
    {
      var commandTextHaveWhere = command.CommandText.Contains("WHERE");
      var currentUser = GetCurrentUser(eventData.Context);

      var userIdParam = command.CreateParameter();
      userIdParam.ParameterName = "@userId";
      userIdParam.Value = currentUser.Id;
      command.Parameters.Add(userIdParam);

      if (commandTextHaveWhere)
      {
        var newCommandText = PutFilterAfterWhereAtCommandText(command.CommandText);

        command.CommandText = newCommandText;

      }
      else
      {
        var newCommandText = PutFilterAfterASAtCommandText(command.CommandText);
        command.CommandText = newCommandText;

      }
    }
    private User GetCurrentUser(DbContext context)
    {
      var Bearertoken = _accessor.HttpContext.Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));
      
      return context.Set<User>().FirstOrDefault(user => user.Id == userId);
    }
    
    private bool EntityHasUserId(DbCommand command, CommandEventData eventData)
    {
      var currentEntity = GetCurrentEntity(command.CommandText);

      var allEntities = eventData.Context.Model.GetEntityTypes();

      var currentEntityContext = allEntities.First(entity => entity.Name.Contains(currentEntity));

      return currentEntityContext.FindProperty("UserId") != null;
    }
    private string GetCurrentEntity(string commandText)
    {
      var commandAsArray = commandText.Split();

      var indexOfFROM = Array.IndexOf(commandAsArray, "FROM");
      if(indexOfFROM >= 0)
      {
        var result = commandAsArray[indexOfFROM + 1];
        return result.Replace("\"", "");
      }
      throw new Exception("Not is a SELECT query");
    }
    private string PutFilterAfterWhereAtCommandText(string commandText)
    {
      var indexOfWHEREClause = commandText.IndexOf("WHERE");

      var userIdFilter = " \"UserId\" = @userId AND";

      var newCommandText = new StringBuilder(commandText);

      newCommandText.Insert(indexOfWHEREClause + 5, userIdFilter);

      return newCommandText.ToString();
    }
    private string PutFilterAfterASAtCommandText(string commandText)
    {
      var indexOfASClause = commandText.IndexOf("AS");

      var whereClause = " WHERE \"UserId\" = @userId";

      var newCommandText = new StringBuilder(commandText);

      newCommandText.Insert(indexOfASClause + 4, whereClause);

      return newCommandText.ToString();
    }
  }
}
