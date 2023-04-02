
using AutoMapper;
using Transactions.Dtos;
using Transactions.Models;

namespace Transactions.Profiles
{
  public class TransactionProfile : Profile
  {
    public TransactionProfile()
    {
      CreateMap<TransactionInput, Transaction>();
      CreateMap<Transaction, TransactionOutput>();
    }
  }
}
