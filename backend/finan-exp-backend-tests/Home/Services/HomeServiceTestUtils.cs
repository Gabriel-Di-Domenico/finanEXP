using AutoMapper;
using Customers.Enums;
using Customers.Models;
using Customers.Profiles;
using finan_exp_backend_tests.Supports;
using Home.Dtos;
using Home.Services;
using Shared.Interfaces;
using Transactions.Models;

namespace finan_exp_backend_tests.Home.Services
{
  public class HomeServiceTestUtils : UnitTestBaseWithDBContext
  {

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
        Id = TestUtils.MockIds[1],
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
        Id = TestUtils.MockIds[2],
        UserId = TestUtils.MockIds[0]
      }
    };
    public List<Transaction> Transactions = new List<Transaction>
    {
      new Transaction
      {
        Id = TestUtils.MockIds[0],
        UserId = TestUtils.MockIds[0],
        CategoryId = TestUtils.MockIds[0],
        Description = TestUtils.MockStrings[0],
        TransactionType = Shared.Enums.TransactionType.Revenue,
        ReceiverCustomerId = TestUtils.MockIds[0],
        Value = 10
      },
      new Transaction
      {
        Id = TestUtils.MockIds[1],
        UserId = TestUtils.MockIds[1],
        CategoryId = TestUtils.MockIds[1],
        Description = TestUtils.MockStrings[1],
        TransactionType = Shared.Enums.TransactionType.Revenue,
        ReceiverCustomerId = TestUtils.MockIds[1],
        Value = 20
      },
      new Transaction
      {
        Id = TestUtils.MockIds[2],
        UserId = TestUtils.MockIds[2],
        CategoryId = TestUtils.MockIds[2],
        Description = TestUtils.MockStrings[2],
        TransactionType = Shared.Enums.TransactionType.Expense,
        ReceiverCustomerId = TestUtils.MockIds[2],
        Value = 30
      },
      new Transaction
      {
        Id = TestUtils.MockIds[3],
        UserId = TestUtils.MockIds[3],
        CategoryId = TestUtils.MockIds[3],
        Description = TestUtils.MockStrings[3],
        TransactionType = Shared.Enums.TransactionType.Expense,
        ReceiverCustomerId = TestUtils.MockIds[3],
        Value = 40
      }
    };

    public List<HomeOutput> HomeOutputs = new List<HomeOutput>
    {
      new HomeOutput
      {
        TotalActualBalance = 6000,
        TotalRevenues = 30,
        TotalExpenses = 70
      }
    };
    public HomeService GetController(Mocker mocker)
    {
      return new HomeService(mocker.CustomersRepository, mocker.TransactionRepository);
    }
    public Mocker GetMocker()
    {
      var mapperConfig = new MapperConfiguration(opt =>
      {
        opt.AddProfile(new CustomerProfiles());
      });
      return new Mocker
      {
        CustomersRepository = _repositoryProvider.GetRepository<Customer>(),
        TransactionRepository = _repositoryProvider.GetRepository<Transaction>(),
      };
    }
    public class Mocker
    {
      public IRepository<Customer> CustomersRepository { get; set; }
      public IRepository<Transaction> TransactionRepository { get; set; }
    }
  }
}


