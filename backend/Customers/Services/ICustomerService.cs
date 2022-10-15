using backend.Customers.Dtos;
using backend.Customers.Models;

namespace backend.Customers.Services
{
  public interface ICustomerService
  {
    Customer GetCustomerByName(Customer name);
    List<Customer> GetAllCustomers(Guid userId);
    Customer GetCustomerById(Guid id, Guid userId);
    Customer UpdateCustomer(Guid id, Guid userId ,CustomerUpdateDto newCustomer);
    bool DeleteCustomer(Guid id, Guid userId);
    bool CreateCustomer(Customer customer);
    bool SaveChanges();

  }
}
