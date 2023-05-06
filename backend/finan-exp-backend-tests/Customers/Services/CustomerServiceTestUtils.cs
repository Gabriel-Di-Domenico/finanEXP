using AutoMapper;
using Customers.Dtos;
using Customers.Enums;
using Customers.Models;
using Customers.Profiles;
using Customers.Services;
using finan_exp_backend_tests.Supports;
using NSubstitute;
using Shared.Interfaces;

namespace finan_exp_backend_tests.Customers.Services
{
  public class CustomerServiceTestUtils : UnitTestBaseWithDBContext
  {
    public List<CustomerInput> CustomerInputs = new List<CustomerInput>
    {
      new CustomerInput
      {
        ActualBalance  = 1000,
        InitialBalance = 0,
        IsArchived = false,
        Name=TestUtils.MockStrings[0],
        TransferValue = 0,
        Type = CustomersTypeOptions.Bank
      },
      new CustomerInput
      {
        ActualBalance  = 2000,
        InitialBalance = 0,
        IsArchived = false,
        Name=TestUtils.MockStrings[1],
        TransferValue = 0,
        Type = CustomersTypeOptions.Savings
      },
      new CustomerInput
      {
        ActualBalance  = 3000,
        InitialBalance = 0,
        IsArchived = false,
        Name=TestUtils.MockStrings[2],
        TransferValue = 0,
        Type = CustomersTypeOptions.Others
      }
    };
    public List<Customer> Customers = new List<Customer>
    {
      new Customer
      {
        ActualBalance  = 1000,
        InitialBalance = 0,
        IsArchived = false,
        Name=TestUtils.MockStrings[0],
        TransferValue = 0,
        Type = CustomersTypeOptions.Bank,
        Id = TestUtils.MockIds[0],
        UserId = TestUtils.MockIds[0]
      },
      new Customer
      {
        ActualBalance  = 2000,
        InitialBalance = 0,
        IsArchived = false,
        Name=TestUtils.MockStrings[1],
        TransferValue = 0,
        Type = CustomersTypeOptions.Savings,
        Id = TestUtils.MockIds[0],
        UserId = TestUtils.MockIds[0]
      },
      new Customer
      {
        ActualBalance  = 3000,
        InitialBalance = 0,
        IsArchived = false,
        Name=TestUtils.MockStrings[2],
        TransferValue = 0,
        Type = CustomersTypeOptions.Others,
        Id = TestUtils.MockIds[0],
        UserId = TestUtils.MockIds[0]
      }
    };
    public List<CustomerOutput> CustomerOutputs = new List<CustomerOutput>
    {
      new CustomerOutput
      {
        ActualBalance  = 1000,
        InitialBalance = 0,
        IsArchived = false,
        Name=TestUtils.MockStrings[0],
        TransferValue = 0,
        Type = CustomersTypeOptions.Bank,
        Id = TestUtils.MockIds[0]
      },
      new CustomerOutput
      {
        ActualBalance  = 2000,
        InitialBalance = 0,
        IsArchived = false,
        Name=TestUtils.MockStrings[1],
        TransferValue = 0,
        Type = CustomersTypeOptions.Savings,
        Id = TestUtils.MockIds[0]
      },
      new CustomerOutput
      {
        ActualBalance  = 3000,
        InitialBalance = 0,
        IsArchived = false,
        Name=TestUtils.MockStrings[2],
        TransferValue = 0,
        Type = CustomersTypeOptions.Others,
        Id = TestUtils.MockIds[0]
      }
    };
    public CustomerService GetService(Mocker mocker)
    {
      return new CustomerService(mocker.Repository, mocker.Mapper, mocker.ValidateCustomerService);
    }
    public Mocker GetMocker()
    {
      var mapperConfig = new MapperConfiguration(opt =>
      {
        opt.AddProfile(new CustomerProfiles());
      });
      return new Mocker
      {
        Mapper = mapperConfig.CreateMapper(),
        Repository = _repositoryProvider.GetRepository<Customer>(),
        ValidateCustomerService = Substitute.For<IValidateCustomerService>()
      };
    }
    public class Mocker
    {
      public IRepository<Customer> Repository { get; set; }
      public IMapper Mapper { get; set; }
      public IValidateCustomerService ValidateCustomerService { get; set; }
    }
  }
}
