using backend.Transactions.Dtos;
using backend.Transactions.Models;
using backend.Shared.Classes;
using backend.Shared.Enums;

namespace backend.Transactions.Services
{
  public interface ITransactionService
  {
    ResponseStatus<List<Transaction>> GetAllTransactions(Guid userId,GetAllFilter? filter);
    ResponseStatus<Transaction> GetTransactionById(Guid id);
    ResponseStatus UpdateTransaction(Guid id, TransactionCreateDto newTransaction);
    ResponseStatus<Transaction> DeleteTransaction(Guid id);
    ResponseStatus CreateTransaction(Transaction category);
    bool SaveChanges();
  }
}
