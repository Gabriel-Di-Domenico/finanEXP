using backend.Contexts;
using backend.Transactions.Dtos;
using backend.Transactions.Models;
using backend.Shared.Classes;
using backend.Shared.Enums;

namespace backend.Transactions.Services
{
  public class TransactionService : ITransactionService
  {
    private readonly FinEXPDatabaseContext _context;

    public TransactionService(FinEXPDatabaseContext context)
    {
      _context = context;
    }

    public ResponseStatus CreateTransaction(Transaction transaction)
    {
      _context.Transactions.Add(transaction);
      SaveChanges();
      return ResponseStatus.Ok;
    }

    public ResponseStatus<Transaction> DeleteTransaction(Guid id)
    {
      var getTransactionByIdResult = GetTransactionById(id);
      if (getTransactionByIdResult.Status == ResponseStatus.Ok)
      {
        _context.Transactions.Remove(getTransactionByIdResult.Content);
        SaveChanges();
        return new ResponseStatus<Transaction>
        {
          Status = ResponseStatus.Ok,
          Content = getTransactionByIdResult.Content
        };
      }
      return new ResponseStatus<Transaction> { Status = ResponseStatus.BadRequest };
    }

    public ResponseStatus<List<Transaction>> GetAllTransactions(Guid userId, GetAllFilter? filter)
    {
      var transactions = _context.Transactions.Where(transaction => transaction.UserId == userId
      && transaction.ReceiverCustomerId == (filter.CustomerId != null ? filter.CustomerId : transaction.ReceiverCustomerId)
      && transaction.TransactionType == (filter.TransactionType != null ? filter.TransactionType : transaction.TransactionType)).ToList();

      if (transactions != null)
      {
        return new ResponseStatus<List<Transaction>> { Status = ResponseStatus.Ok, Content = transactions };
      }

      return new ResponseStatus<List<Transaction>>
      {
        Status = ResponseStatus.NotFound,
      };
    }

    public ResponseStatus<Transaction> GetTransactionById(Guid id)
    {
      var transaction = _context.Transactions.FirstOrDefault(transaction => transaction.Id == id);
      if (transaction != null)
      {
        return new ResponseStatus<Transaction> { Status = ResponseStatus.Ok, Content = transaction };
      }

      return new ResponseStatus<Transaction>
      {
        Status = ResponseStatus.NotFound,
      };
    }

    public bool SaveChanges()
    {
      return _context.SaveChanges() >= 0;
    }

    public ResponseStatus UpdateTransaction(Guid id, TransactionCreateDto newTransaction)
    {
      var getTransactionByIdResult = GetTransactionById(id);

      if (getTransactionByIdResult.Status == ResponseStatus.Ok)
      {

        getTransactionByIdResult.Content.CategoryId = newTransaction.CategoryId;
        getTransactionByIdResult.Content.ReceiverCustomerId = newTransaction.ReceiverCustomerId;
        getTransactionByIdResult.Content.Value = newTransaction.Value;
        getTransactionByIdResult.Content.TransactionType = newTransaction.TransactionType;
        getTransactionByIdResult.Content.Description = newTransaction.Description;
        getTransactionByIdResult.Content.Date = newTransaction.Date;

        _context.Transactions.Update(getTransactionByIdResult.Content);
        SaveChanges();
        return ResponseStatus.Ok;
      }
      return ResponseStatus.BadRequest;
    }
  }
}
