using Customers.Models;
using Shared.Classes;
using Shared.Enums;

namespace Customers.Services
{
  public interface ICustomerService
  {
    Customer GetCustomerByName(Customer name);
    ResponseStatus<List<Customer>> GetAllCustomers(Guid userId, GetAllFilter? filter);
    ResponseStatus<Customer> GetCustomerById(Guid id, Guid userId);
    ResponseStatus UpdateCustomer(Guid id, Customer newCustomer);

    ResponseStatus BatchUpdateCustomer(List<Customer> newCustomer);
    ResponseStatus DeleteCustomer(Guid id, Guid userId);
    ResponseStatus CreateCustomer(Customer customer);
    bool SaveChanges();

  }
}
