using backend.Contexts;
using backend.Customers.Dtos;
using backend.Customers.Models;
using backend.Shared.Enums;

namespace backend.Customers.Services
{
  public class CustomerService : ICustomerService
  {
    private readonly FinEXPDatabaseContext _context;

    public CustomerService(FinEXPDatabaseContext context)
    {
      _context = context;
    }
    public ResponseStatus CreateCustomer(Customer customer)
    {
      var customerFromDatabase = GetCustomerByName(customer);

      if (customerFromDatabase == null)
      {
        customer.TransferValue = 0;
        customer.ActualBalance = customer.InitialBalance;
        _context.Customers.Add(customer);
        SaveChanges();
        return ResponseStatus.Ok;
      }
      else
      {
        return ResponseStatus.AlreadyExists;
      }

    }

    public bool SaveChanges()
    {
      return _context.SaveChanges() >= 0;
    }

    public Customer? GetCustomerByName(Customer newCustomer)
    {
      return _context.Customers.FirstOrDefault(customer =>
        customer.UserId == newCustomer.UserId
        && customer.Name == newCustomer.Name
      );
    }
    public ResponseStatus<List<Customer>> GetAllCustomers(Guid userId)
    {
      var customers = _context.Customers.Where(customer => customer.UserId == userId).ToList();
      if (customers != null)
      {
        return new ResponseStatus<List<Customer>> { Status = ResponseStatus.Ok, Content = customers };
      }

      return new ResponseStatus<List<Customer>>
      {
        Status = ResponseStatus.NotFound,
      };

    }

    public ResponseStatus<Customer> GetCustomerById(Guid id, Guid userId)
    {
      var customer = _context.Customers.FirstOrDefault(customer => customer.Id == id && customer.UserId == userId);
      if (customer != null)
      {

        return new ResponseStatus<Customer> { Status = ResponseStatus.Ok, Content = customer };

      }

      return new ResponseStatus<Customer>
      {
        Status = ResponseStatus.NotFound,
      };
    }

    public ResponseStatus UpdateCustomer(Guid id, Guid userId, CustomerUpdateDto newCustomer)
    {
      var getCustomerByIdResult = GetCustomerById(id, userId);

      if (getCustomerByIdResult.Status == ResponseStatus.Ok)
      {
        getCustomerByIdResult.Content.Type = newCustomer.Type;
        getCustomerByIdResult.Content.Name = newCustomer.Name;
        getCustomerByIdResult.Content.InitialBalance = (decimal)newCustomer.InitialBalance;

        if (newCustomer.ActualBalance > 0)
        {
          getCustomerByIdResult.Content.ActualBalance = newCustomer.ActualBalance;
        }

        _context.Customers.Update(getCustomerByIdResult.Content);
        SaveChanges();
        return ResponseStatus.Ok;
      }
      return ResponseStatus.BadRequest;
    }
    public ResponseStatus BatchUpdateCustomer(List<Customer> customers)
    {
      foreach (var customer in customers)
      {
        _context.Customers.Update(customer);
      }
      SaveChanges();

      return ResponseStatus.Ok;
    }
    public ResponseStatus DeleteCustomer(Guid id, Guid userId)
    {
      var getCustomerByIdResult = GetCustomerById(id, userId);
      if (getCustomerByIdResult.Status == ResponseStatus.Ok)
      {
        _context.Customers.Remove(getCustomerByIdResult.Content);
        SaveChanges();
        return ResponseStatus.Ok;
      }
      return ResponseStatus.BadRequest;
    }
  }
}

