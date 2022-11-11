using backend.Shared.Enums;

namespace backend.Customers.Services
{
  public interface ICustomerBalanceService
  {
    ResponseStatus CalculateCustomerBalance(Guid customerId, Guid userId);
  }
}
