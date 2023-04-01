using Shared.Classes;
using Shared.Enums;
using Transactions.Models;
using Transactions.Dtos;

namespace Transactions.Services
{
  public interface ITransactionService
  {
    Task<ResponseStatus<List<Transaction>>> GetAllTransactions(GetAllFilter? filter);
    Task<ResponseStatus<Transaction>> GetTransactionById(Guid id);
    Task<ResponseStatus<Transaction>> UpdateTransaction(Guid id, TransactionInput newTransaction);
    Task<ResponseStatus<Transaction>> DeleteTransaction(Guid id);
    Task<ResponseStatus> CreateTransaction(TransactionInput input);
  }
}
