using AutoMapper;
using Contexts;
using Customers.Dtos;
using Customers.Models;
using Microsoft.EntityFrameworkCore;
using Shared.Classes;
using Shared.Enums;
using Shared.Extensions;
using Shared.Interfaces;

namespace Customers.Services
{
  public class CustomerService : ICustomerService
  {
    private readonly IRepository<Customer> _repository;
    private readonly IMapper _mapper;
    private readonly IValidateCustomerService _validateCustomerService;

    public CustomerService(IRepository<Customer> repository, IMapper mapper, IValidateCustomerService validateCustomerService)
    {
      _repository = repository;
      _mapper = mapper;
      _validateCustomerService = validateCustomerService;
    }
    public async Task<ResponseStatus> CreateCustomer(CustomerInput input)
    {
      var customer = _mapper.Map<Customer>(input);

      var customerAlreayExists = await _validateCustomerService.AlreadyExistsValidation(customer);

      if (customerAlreayExists == ResponseStatus.AlreadyExists)
      {
        return ResponseStatus.AlreadyExists;
      }
      else
      {
        customer.ActualBalance = customer.InitialBalance;
        await _repository.AddAsync(customer, true);

        return ResponseStatus.Ok;
      }
    }
    public async Task<ResponseStatus<List<Customer>>> GetAllCustomers(GetAllFilter? filter)
    {
      var customers = await _repository
        .WhereIf(filter.CustomersIds.Any(), customer => filter.CustomersIds.Contains(customer.Id))
        .WhereIf(filter.IsArchived.HasValue, (customer => customer.IsArchived == filter.IsArchived))
        .ToListAsync();

      if (customers != null)
      {
        return new ResponseStatus<List<Customer>> { Status = ResponseStatus.Ok, Content = customers };
      }

      return new ResponseStatus<List<Customer>>
      {
        Status = ResponseStatus.NotFound,
      };

    }

    public async Task<ResponseStatus<Customer>> GetCustomerById(Guid id)
    {
      var customer = await _repository.FirstOrDefaultAsync(customer => customer.Id == id);
      if (customer != null)
      {

        return new ResponseStatus<Customer> { Status = ResponseStatus.Ok, Content = customer };

      }

      return new ResponseStatus<Customer>
      {
        Status = ResponseStatus.NotFound,
      };
    }

    public async Task<ResponseStatus> UpdateCustomer(Guid id, CustomerInput? input)
    {
      var userFromDataBase = await _repository.FirstOrDefaultAsync(customer => customer.Id == id);

      var customer = _mapper.Map<Customer>(input);

      var validateCustomer = ResponseStatus.Ok;
      if (input != null && !input.IsArchived)
      {
        validateCustomer = await _validateCustomerService.ValidateUpdateCustomer(customer);
      }
      
      if (validateCustomer == ResponseStatus.Ok)
      {
        userFromDataBase.IsArchived = input.IsArchived;

        userFromDataBase.InitialBalance = input.InitialBalance;
        userFromDataBase.Name = input.Name;
        userFromDataBase.Type = input.Type;

        _repository.Update(userFromDataBase, true);

        return ResponseStatus.Ok;
      }
      return validateCustomer;
    }
    public ResponseStatus BatchUpdateCustomer(List<CustomerInput> customers)
    {
      foreach (var customerInput in customers)
      {
        var customer = _mapper.Map<Customer>(customerInput);
        _repository.Update(customer);
      }
      //TODO Refatorar quando tiver Unit of work
      _repository.SaveChanges();

      return ResponseStatus.Ok;
    }
    public async Task<ResponseStatus> DeleteCustomer(Guid id)
    {
      var getCustomerByIdResult = await _repository.FirstOrDefaultAsync(customer => customer.Id == id);

      _repository.Remove(getCustomerByIdResult, true);

      return ResponseStatus.Ok;

    }
  }
}

