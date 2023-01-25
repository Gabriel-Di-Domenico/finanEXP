using AutoMapper;
using Customers.Models;
using Shared.Classes;
using Shared.Enums;
using Transactions.Models;
using Transactions.Services;

namespace Customers.Services
{
  public class CustomerBalanceService : ICustomerBalanceService
  {
    private readonly ICustomerService _customerService;
    private readonly ITransactionService _transactionService;
    private readonly IMapper _mapper;

    public CustomerBalanceService(ICustomerService customerService, ITransactionService transactionService, IMapper mapper)
    {
      _customerService = customerService;
      _transactionService = transactionService;
      _mapper = mapper;
    }

    public ResponseStatus CalculateTransferValue(bool isCreate, Transaction transaction, Guid userId)
    {
      if (transaction.SenderCustomerId != null)
      {
        var customersFilter = new GetAllFilter
        {
          CustomersIds = new List<Guid>
          {
            transaction.ReceiverCustomerId,
            (Guid)transaction.SenderCustomerId
          },
        };
        var customers = _customerService.GetAllCustomers(userId, customersFilter);

        var senderCustomer = customers.Content.Find((customer) => customer.Id == transaction.SenderCustomerId);
        var receiverCustomer = customers.Content.Find((customer) => customer.Id == transaction.ReceiverCustomerId);

        var senderCustomertransactions = _transactionService.GetAllTransactions(userId, new GetAllFilter
        {
          CustomerId = senderCustomer.Id,
          TransactionType = TransactionType.Transfer

        });
        var receiverCustomertransactions = _transactionService.GetAllTransactions(userId, new GetAllFilter
        {
          CustomerId = receiverCustomer.Id,
          TransactionType = TransactionType.Transfer

        });
        decimal transferValue = 0;

        senderCustomertransactions.Content.ForEach(transaction =>
        {
          if (transaction.SenderCustomerId == senderCustomer.Id)
          {
            transferValue -= transaction.Value;
          }
          else if (transaction.ReceiverCustomerId == senderCustomer.Id)
          {
            transferValue += transaction.Value;
          }
        });
        senderCustomer.TransferValue = transferValue;

        transferValue = 0;

        receiverCustomertransactions.Content.ForEach(transaction =>
        {
          if (transaction.SenderCustomerId == receiverCustomer.Id)
          {
            transferValue -= transaction.Value;
          }
          else if (transaction.ReceiverCustomerId == receiverCustomer.Id)
          {
            transferValue += transaction.Value;
          }
        });
        receiverCustomer.TransferValue = transferValue;

        var updateCustomersResult = _customerService.BatchUpdateCustomer(new List<Customer>
        {
          senderCustomer, receiverCustomer
        });


        return ResponseStatus.Ok;
      }
      else
      {
        throw new Exception("SenderCustomerId is Required");
      }
    }

    public ResponseStatus CalculateCustomerBalance(Guid customerId, Guid userId)
    {
      var customer = _customerService.GetCustomerById(customerId, userId);

      var filter = new GetAllFilter { CustomerId = customerId };
      var transactions = _transactionService.GetAllTransactions(userId, filter);

      decimal totalValue = customer.Content.InitialBalance + customer.Content.TransferValue;

      transactions.Content.ForEach(transaction =>
      {
        if (transaction.TransactionType == TransactionType.Revenue)
        {
          totalValue = totalValue += transaction.Value;
        }
        else if (transaction.TransactionType == TransactionType.Expense)
        {
          totalValue = totalValue -= transaction.Value;
        }
      });
      customer.Content.ActualBalance = totalValue;

      var updateCustomerResult = _customerService.UpdateCustomer(customer.Content.Id, customer.Content);

      if (updateCustomerResult == ResponseStatus.Ok || updateCustomerResult == ResponseStatus.AlreadyExists)
      {
        return ResponseStatus.Ok;
      }
      else if (updateCustomerResult == ResponseStatus.BadRequest)
      {
        return ResponseStatus.BadRequest;
      }
      throw new Exception("Error Update Customer Result");
    }
  }
}
