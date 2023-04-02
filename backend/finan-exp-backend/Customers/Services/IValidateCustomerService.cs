using Customers.Models;
using Shared.Enums;

namespace Customers.Services
{
  public interface IValidateCustomerService
  {
    public Task<ResponseStatus> ValidateUpdateCustomer(Customer customer);
    Task<ResponseStatus> AlreadyExistsValidation(Customer customer);
  }
}
