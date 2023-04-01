using Shared.Enums;
using Transactions.Models;

namespace Customers.Services
{
  public interface ICustomerBalanceService
  {
    Task<ResponseStatus> CalculateCustomerBalance(Guid customerId);
    Task<ResponseStatus> CalculateTransferValue(bool isCreate, Transaction transaction);
  }
}
