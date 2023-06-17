using Customers.Models;
using Home.Dtos;
using Shared.Enums;
using Shared.Interfaces;
using Transactions.Models;

namespace Home.Services
{
  public class HomeService : IHomeService
  {
    public HomeService(IRepository<Customer> customersRepository, IRepository<Transaction> transactionsRepository)
    {
      _customersRepository = customersRepository;
      _transactionsRepository = transactionsRepository;
    }

    public IRepository<Customer> _customersRepository { get; }
    public IRepository<Transaction> _transactionsRepository { get; }

    public async Task<ResponseStatus<HomeOutput>> Get()
    {
      var customers = await _customersRepository.ToListAsync();
      var transactions = await _transactionsRepository.ToListAsync();

      decimal expensesTotalValue = 0.0m;
      decimal revenuesTotalValue = 0.0m;
      decimal actualTotalBalance = 0.0m;

      transactions.ForEach(e =>
      {
        if (e.TransactionType == TransactionType.Expense)
        {
          expensesTotalValue += e.Value;
        }
        else if (e.TransactionType == TransactionType.Revenue)
        {
          revenuesTotalValue += e.Value;
        }
      });
      customers.ForEach(e =>
      {
        actualTotalBalance += e.ActualBalance;
      });

      return new ResponseStatus<HomeOutput>
      {
        Content = new HomeOutput
        {
          TotalActualBalance = actualTotalBalance,
          TotalExpenses = expensesTotalValue,
          TotalRevenues = revenuesTotalValue
        },
        Status = ResponseStatus.Ok
      };
    }
  }
}
