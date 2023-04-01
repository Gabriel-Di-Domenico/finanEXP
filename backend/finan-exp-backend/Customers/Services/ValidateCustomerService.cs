using Customers.Models;
using Shared.Enums;
using Shared.Interfaces;

namespace Customers.Services
{
  public class ValidateCustomerService : IValidateCustomerService
  {
    private readonly IRepository<Customer> _repository;
    
    public ValidateCustomerService(IRepository<Customer> repository)
    {
      _repository = repository;
    }
 
    public async Task<ResponseStatus> ValidateUpdateCustomer(Customer customer)
    {
      var customerFromDataBase = await _repository.FirstOrDefaultAsync(e => e.Name == customer.Name);

      if(customerFromDataBase == null || customerFromDataBase.Id == customer.Id)
      {
        return ResponseStatus.Ok;
      }
      return ResponseStatus.AlreadyExists;
    }

    public async Task<ResponseStatus> AlreadyExistsValidation(Customer customer)
    {
      if (await _repository.AnyAsync(e => e.Name == customer.Name))
      {
        return ResponseStatus.AlreadyExists;
      }
      else
      {
        return ResponseStatus.Ok;
      }
    }
  }
}
