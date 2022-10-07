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
      if (customer == null)
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
        var customer = _context.Customers.FirstOrDefault(customer => customer.UserId == newCustomer.UserId && customer.Name == newCustomer.Name);
        if (customer != null)
        {
          return customer;
        }
        else
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
      var customers = _context.Customers.Where(customer => customer.UserId == userId).ToList();

      if (customers != null)
      {
        return customers;
      }
      else
      {
        return null;
      }
    }

    public CustomerModel GetCustomerById(Guid id, Guid userId)
    {
      var customer = _context.Customers.FirstOrDefault(customer => customer.Id == id);
      if (customer != null && customer.UserId == userId)
      {

        return customer;

      }
      return null;
    }

    public CustomerModel UpdateCustomer(Guid id, Guid userId, CustomerUpdateDto newCustomer)
    {
      var customer = GetCustomerById(id, userId);

      if (customer != null)
      {
        customer.Type = newCustomer.Type;
        customer.Name = newCustomer.Name;

        if(newCustomer.Balance != null)
        {
          customer.Balance = (decimal)newCustomer.Balance;
        }

        _context.Customers.Update(customer);
        SaveChanges();
        return customer;
      }
      else
      {
        return null;
      }
    }

    public bool DeleteCustomer(Guid id, Guid userId)
    {
      var customer = GetCustomerById(id, userId);
      if(customer != null)
      {
        _context.Customers.Remove(customer);
        SaveChanges();
        return true;
      }
      else
      {
        return false;
      }
      
    }
  }
}
