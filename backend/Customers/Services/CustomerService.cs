using backend.Contexts;
using backend.Customers.Dtos;
using backend.Customers.Models;

namespace backend.Customers.Services
{
  public class CustomerService : ICustomerService
  {
    private readonly FinEXPDatabaseContext _context;

    public CustomerService(FinEXPDatabaseContext context)
    {
      _context = context;
    }
    public bool CreateCustomer(CustomerModel customer)
    {
      if(customer == null)
      {
        throw new ArgumentNullException();
        return false;
      }
      else
      {
        _context.Customers.Add(customer);
        return true;
      }
    }

    public bool SaveChanges()
    {
      return _context.SaveChanges() >= 0;
    }

    public CustomerModel GetCustomerByName(CustomerModel newCustomer)
    {
      if (newCustomer != null)
      {
        var customer = _context.Customers.FirstOrDefault(p => p.UserId == newCustomer.UserId && p.Name == newCustomer.Name);
        if(customer != null)
        {
          return customer;
        }else
        {
          return null;
        }
      }
      else
      {
        return null;
      }
    }

    public List<CustomerModel> GetAllCustomers(Guid userId)
    {
      var customers = _context.Customers.Where(p => p.UserId == userId).ToList();

      if(customers != null)
      {
        return customers;
      }
      else
      {
        return null;
      }
    }
  }
}
