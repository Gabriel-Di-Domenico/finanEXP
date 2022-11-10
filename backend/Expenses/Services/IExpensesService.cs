using backend.Expenses.Dtos;
using backend.Expenses.Models;
using backend.Shared.Classes;
using backend.Shared.Enums;

namespace backend.Expenses.Services
{
  public interface IExpensesService
  {
    ResponseStatus<List<Expense>> GetAllExpenses(GetAllFilter? filter);
    ResponseStatus<Expense> GetExpenseById(Guid id);
    ResponseStatus UpdateExpense(Guid id, ExpenseCreateDto newExpense);
    ResponseStatus DeleteExpense(Guid id);
    ResponseStatus CreateExpense(Expense category);
    bool SaveChanges();
  }
}
