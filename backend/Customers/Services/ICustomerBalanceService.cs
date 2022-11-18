using backend.Shared.Enums;
using backend.Transactions.Models;

namespace backend.Customers.Services
{
  public interface ICustomerBalanceService
  {
    ResponseStatus CalculateCustomerBalance(Guid customerId, Guid userId);
    ResponseStatus CalculateTransferValue(bool isCreate,Transaction transaction, Guid userId);
  }
}
