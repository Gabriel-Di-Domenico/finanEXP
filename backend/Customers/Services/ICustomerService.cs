using backend.Customers.Dtos;
using backend.Customers.Models;
using backend.Shared.Enums;

namespace backend.Customers.Services
{
  public interface ICustomerService
  {
    Customer GetCustomerByName(Customer name);
    ResponseStatus<List<Customer>> GetAllCustomers(Guid userId);
    ResponseStatus<Customer> GetCustomerById(Guid id, Guid userId);
    ResponseStatus UpdateCustomer(Guid id, Guid userId ,CustomerUpdateDto newCustomer);

    ResponseStatus BatchUpdateCustomer(List<Customer> newCustomer);
    ResponseStatus DeleteCustomer(Guid id, Guid userId);
    ResponseStatus CreateCustomer(Customer customer);
    bool SaveChanges();

  }
}
