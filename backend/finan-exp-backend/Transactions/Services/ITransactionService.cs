using Shared.Classes;
using Shared.Enums;
using Transactions.Models;
using Transactions.Dtos;

namespace Transactions.Services
{
  public interface ITransactionService
  {
    ResponseStatus<List<Transaction>> GetAllTransactions(Guid userId, GetAllFilter? filter);
    ResponseStatus<Transaction> GetTransactionById(Guid id);
    ResponseStatus<Transaction> UpdateTransaction(Guid id, TransactionCreateDto newTransaction);
    ResponseStatus<Transaction> DeleteTransaction(Guid id);
    ResponseStatus CreateTransaction(Transaction category);
    bool SaveChanges();
  }
}
