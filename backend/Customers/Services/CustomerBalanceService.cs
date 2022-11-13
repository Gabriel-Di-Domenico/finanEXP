using AutoMapper;
using backend.Customers.Dtos;
using backend.Shared.Classes;
using backend.Shared.Enums;
using backend.Transactions.Services;

namespace backend.Customers.Services
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
    public ResponseStatus CalculateCustomerBalance(Guid customerId, Guid userId)
    {
      var customer = _customerService.GetCustomerById(customerId, userId);

      var customerModel = _mapper.Map<CustomerUpdateDto>(customer.Content);

      var filter = new GetAllFilter { CustomerId = customerId };
      var transactions = _transactionService.GetAllTransactions(userId, filter);

      decimal totalValue = customerModel.InitialBalance;

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
      customerModel.ActualBalance = totalValue;

      var updateCustomerResult = _customerService.UpdateCustomer(customer.Content.Id, userId, customerModel);
      if (updateCustomerResult == ResponseStatus.Ok)
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
