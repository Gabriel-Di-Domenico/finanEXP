using backend.Contexts;
using backend.Expenses.Dtos;
using backend.Expenses.Models;
using backend.models;
using backend.Shared.Classes;
using backend.Shared.Enums;

namespace backend.Expenses.Services
{
  public class ExpensesService : IExpensesService
  {
    private readonly FinEXPDatabaseContext _context;

    public ExpensesService(FinEXPDatabaseContext context)
    {
      _context = context;
    }

    public ResponseStatus CreateExpense(Expense expense)
    {    
      _context.Expenses.Add(expense);
      SaveChanges();
      return ResponseStatus.Ok;
      //TODO Adicionar o calculo de valor de customers
    }

    public ResponseStatus DeleteExpense(Guid id)
    {
      var getExpenseByIdResult = GetExpenseById(id);
      if (getExpenseByIdResult.Status == ResponseStatus.Ok)
      {
        _context.Expenses.Remove(getExpenseByIdResult.Content);
        SaveChanges();
        return ResponseStatus.Ok;
      }
      return ResponseStatus.BadRequest;
      //TODO Adicionar o calculo de valor de customers
    }

    public ResponseStatus<List<Expense>> GetAllExpenses(GetAllFilter? filter)
    {
      var expenses = _context.Expenses.ToList();

      if (expenses != null)
      {
        return new ResponseStatus<List<Expense>> { Status = ResponseStatus.Ok, Content = expenses };
      }

      return new ResponseStatus<List<Expense>>
      {
        Status = ResponseStatus.NotFound,
      };
    }

    public ResponseStatus<Expense> GetExpenseById(Guid id)
    {
      var expense = _context.Expenses.FirstOrDefault(expense => expense.Id == id);
      if (expense != null)
      {
        return new ResponseStatus<Expense> { Status = ResponseStatus.Ok, Content = expense };
      }

      return new ResponseStatus<Expense>
      {
        Status = ResponseStatus.NotFound,
      };
    }

    public bool SaveChanges()
    {
      return _context.SaveChanges() >= 0;
    }

    public ResponseStatus UpdateExpense(Guid id, ExpenseCreateDto newExpense)
    {
      var getExpenseByIdResult = GetExpenseById(id);

      if (getExpenseByIdResult.Status == ResponseStatus.Ok)
      {

        getExpenseByIdResult.Content.CategoryId = newExpense.CategoryId;
        getExpenseByIdResult.Content.CustomerId = newExpense.CustomerId;
        getExpenseByIdResult.Content.Value = newExpense.Value;

        _context.Expenses.Update(getExpenseByIdResult.Content);
        SaveChanges();
        return ResponseStatus.Ok;
      }
      return ResponseStatus.BadRequest;
      //TODO adicionar calculo
    }
  }
}
