using AutoMapper;
using Categories.Profiles;
using Customers.Controllers;
using Customers.Dtos;
using Customers.Enums;
using Customers.Models;
using Customers.Profiles;
using Customers.Services;
using finan_exp_backend_tests.Supports;
using NSubstitute;

namespace finan_exp_backend_tests.Customers.Controllers
{
  public class CustomerControllerTestUtils : UnitTestBaseWithDBContext
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
    public CustomerController GetController(Mocker mocker)
    {
      return new CustomerController(mocker.CustomerService, mocker.Mapper, mocker.CustomerBalanceService);
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
        CustomerService = Substitute.For<ICustomerService>(),
        CustomerBalanceService = Substitute.For<ICustomerBalanceService>()
      };
    }
    public class Mocker
    {

      public ICustomerService CustomerService { get; set; }
      public IMapper Mapper { get; set; }
      public ICustomerBalanceService CustomerBalanceService { get; set; }
    }
  }
}
