using AutoMapper;
using backend.Expenses.Dtos;
using backend.Expenses.Models;

namespace backend.Expenses.Profiles
{
  public class ExpenseProfile : Profile
  {
    public ExpenseProfile()
    {
      CreateMap<ExpenseCreateDto, Expense>();
      CreateMap<Expense, ExpenseReadDto>();
    }
  }
}
