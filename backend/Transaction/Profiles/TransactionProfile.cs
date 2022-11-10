using AutoMapper;
using backend.Transactions.Dtos;
using backend.Transactions.Models;

namespace backend.Transactions.Profiles
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
