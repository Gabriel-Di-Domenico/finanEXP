using Shared.Classes;
using Shared.Enums;
using Contexts;
using Transactions.Dtos;
using Transactions.Models;

namespace Transactions.Services
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
      if (transaction.SenderCustomerId != transaction.ReceiverCustomerId)
      {
        _context.Transactions.Add(transaction);
        SaveChanges();
        return ResponseStatus.Ok;
      }
      throw new Exception("SenderCustomer can't be equal ReceiverCustomer");
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
      && (transaction.ReceiverCustomerId == (filter.CustomerId != null ? filter.CustomerId : transaction.ReceiverCustomerId) || transaction.SenderCustomerId == (filter.CustomerId != null ? filter.CustomerId : transaction.SenderCustomerId))
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

    public ResponseStatus<Transaction> UpdateTransaction(Guid id, TransactionCreateDto newTransaction)
    {
      if (newTransaction.SenderCustomerId == newTransaction.ReceiverCustomerId)
      {
        throw new Exception("SenderCustomer can't be equal ReceiverCustomer");
      }
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
        return new ResponseStatus<Transaction>
        {
          Status = ResponseStatus.Ok,
          Content = getTransactionByIdResult.Content
        };
      }
      return new ResponseStatus<Transaction>
      {
        Status = ResponseStatus.BadRequest,
      };
    }
  }
}
