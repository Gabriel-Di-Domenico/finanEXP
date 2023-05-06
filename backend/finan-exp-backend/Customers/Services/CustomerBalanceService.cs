using AutoMapper;
using Customers.Dtos;
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

    public async Task<ResponseStatus> CalculateTransferValue(bool isCreate, Transaction transaction)
    {
      if(transaction.SenderCustomer == null)
      {
        throw new Exception("SenderCustomerId is Required");
      }
     
      var customersFilter = new GetAllFilter
      {
        CustomersIds = new List<Guid>
        {
          transaction.ReceiverCustomerId,
          (Guid)transaction.SenderCustomerId
        },
      };
      var customers = await _customerService.GetAllCustomers(customersFilter);

      var senderCustomer = customers.Content.Find((customer) => customer.Id == transaction.SenderCustomerId);
      var receiverCustomer = customers.Content.Find((customer) => customer.Id == transaction.ReceiverCustomerId);

      var senderCustomertransactions = await _transactionService.GetAllTransactions(new GetAllFilter
      {
        CustomerId = senderCustomer.Id,
        TransactionType = TransactionType.Transfer

      });
      var receiverCustomertransactions = await _transactionService.GetAllTransactions(new GetAllFilter
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

      /*var updateCustomersResult = _customerService.BatchUpdateCustomer(new List<Customer>
      {
        senderCustomer, receiverCustomer
      });*/

      return ResponseStatus.Ok;
    
    }

    public async Task<ResponseStatus> CalculateCustomerBalance(Guid customerId)
    {
      var customer = await _customerService.GetCustomerById(customerId);

      var filter = new GetAllFilter { CustomerId = customerId };
      var transactions = await _transactionService.GetAllTransactions(filter);

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

      var customerInput = _mapper.Map<CustomerInput>(customer.Content);
      var updateCustomerResult = await _customerService.UpdateCustomer(customer.Content.Id, customerInput);
      
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
