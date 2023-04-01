using Shared.Classes;
using Shared.Enums;
using Contexts;
using Transactions.Dtos;
using Transactions.Models;
using Shared.Interfaces;
using AutoMapper;
using Shared.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Transactions.Services
{
  public class TransactionService : ITransactionService
  {
    private readonly IRepository<Transaction> _repository;
    private readonly IMapper _mapper;

    public TransactionService(IRepository<Transaction> repository,
       IMapper mapper)
    {
      _repository = repository;
      _mapper = mapper;
    }

    public async Task<ResponseStatus> CreateTransaction(TransactionInput input)
    {
      if (input.SenderCustomerId == input.ReceiverCustomerId)
      {
        throw new Exception("SenderCustomer can't be equal ReceiverCustomer");
      }

      var transaction = _mapper.Map<Transaction>(input);
      await _repository.AddAsync(transaction, true);

      return ResponseStatus.Ok;
      
    }

    public async Task<ResponseStatus<Transaction>> DeleteTransaction(Guid id)
    {
      var getTransactionByIdResult = await _repository.FirstOrDefaultAsync(transaction => transaction.Id == id);
      
     _repository.Remove(getTransactionByIdResult, true);

      return new ResponseStatus<Transaction>
      {
        Content = getTransactionByIdResult,
        Status = ResponseStatus.Ok
      };
    }

    public async Task<ResponseStatus<List<Transaction>>> GetAllTransactions(GetAllFilter? filter)
    {
      var transactions = await _repository
        .WhereIf(filter.CustomerId != null, (transaction => transaction.ReceiverCustomerId == filter.CustomerId || transaction.SenderCustomerId == filter.CustomerId))
        .WhereIf(filter.TransactionType != null, (transaction => transaction.TransactionType == filter.TransactionType))
        .ToListAsync();

      if (transactions != null)
      {
        return new ResponseStatus<List<Transaction>> { Status = ResponseStatus.Ok, Content = transactions };
      }

      return new ResponseStatus<List<Transaction>>
      {
        Status = ResponseStatus.NotFound,
      };
    }
    public async Task<ResponseStatus<Transaction>> GetTransactionById(Guid id)
    {
      var transaction = await _repository.FirstOrDefaultAsync(transaction => transaction.Id == id);
      if (transaction != null)
      {
        return new ResponseStatus<Transaction> { Status = ResponseStatus.Ok, Content = transaction };
      }

      return new ResponseStatus<Transaction>
      {
        Status = ResponseStatus.NotFound,
      };
    }

    public async Task<ResponseStatus<Transaction>> UpdateTransaction(Guid id, TransactionInput newTransaction)
    {
      if (newTransaction.SenderCustomerId == newTransaction.ReceiverCustomerId)
      {
        throw new Exception("SenderCustomer can't be equal ReceiverCustomer");
      }
      var getTransactionByIdResult = await _repository.FirstOrDefaultAsync(transaction => transaction.Id == id);

      getTransactionByIdResult.CategoryId = newTransaction.CategoryId;
      getTransactionByIdResult.ReceiverCustomerId = newTransaction.ReceiverCustomerId;
      getTransactionByIdResult.Value = newTransaction.Value;
      getTransactionByIdResult.TransactionType = newTransaction.TransactionType;
      getTransactionByIdResult.Description = newTransaction.Description;
      getTransactionByIdResult.Date = newTransaction.Date;

      _repository.Update(getTransactionByIdResult, true);
        
      return new ResponseStatus<Transaction>
      {
        Status = ResponseStatus.Ok,
        Content = getTransactionByIdResult
      };
    }
  }
}
