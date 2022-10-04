using backend.Customers.Dtos;
using backend.Customers.Models;

namespace backend.Customers.Services
{
  public interface ICustomerService
  {
    CustomerModel GetCustomerByName(CustomerModel name);
    bool CreateCustomer(CustomerModel customer);

    bool SaveChanges();

  }
}
