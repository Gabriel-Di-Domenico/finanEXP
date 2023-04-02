using Customers.Dtos;
using Customers.Models;
using Shared.Classes;
using Shared.Enums;

namespace Customers.Services
{
  public interface ICustomerService
  {
    Task<ResponseStatus<List<Customer>>> GetAllCustomers(GetAllFilter? filter);
    Task<ResponseStatus<Customer>> GetCustomerById(Guid id);
    Task<ResponseStatus> UpdateCustomer(Guid id, CustomerInput newCustomer);

    ResponseStatus BatchUpdateCustomer(List<CustomerInput> newCustomer);
    Task<ResponseStatus> DeleteCustomer(Guid id);
    Task<ResponseStatus> CreateCustomer(CustomerInput input);
  }
}
