using Shared.Enums;
using Transactions.Models;

namespace Customers.Services
{
  public interface ICustomerBalanceService
  {
    ResponseStatus CalculateCustomerBalance(Guid customerId, Guid userId);
    ResponseStatus CalculateTransferValue(bool isCreate, Transaction transaction, Guid userId);
  }
}
