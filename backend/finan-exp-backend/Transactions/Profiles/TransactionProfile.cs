
using AutoMapper;
using Transactions.Dtos;
using Transactions.Models;

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
