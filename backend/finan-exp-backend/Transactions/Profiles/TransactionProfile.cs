using AutoMapper;
using System.Transactions;
using Transactions.Dtos;

namespace Transactions.Profiles
{
  public class TransactionProfile : Profile
  {
    public TransactionProfile()
    {
      CreateMap<TransactionCreateDto, Transaction>();
      CreateMap<Transaction, TransactionReadDto>();
    }
  }
}
