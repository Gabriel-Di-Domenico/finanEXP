using backend.Customers.Dtos;
using backend.Customers.Models;

namespace backend.Customers.Services
{
  public interface ICustomerService
  {
    CustomerModel GetCustomerByName(CustomerModel name);
    List<CustomerModel> GetAllCustomers(Guid userId);
    CustomerModel GetCustomerById(Guid id, Guid userId);
    CustomerModel UpdateCustomer(Guid id, Guid userId ,CustomerUpdateDto newCustomer);
    bool DeleteCustomer(Guid id, Guid userId);
    bool CreateCustomer(CustomerModel customer);
    bool SaveChanges();

  }
}
