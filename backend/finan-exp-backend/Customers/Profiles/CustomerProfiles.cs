using AutoMapper;
using Customers.Dtos;
using Customers.Models;

namespace Customers.Profiles
{
  public class CustomerProfiles : Profile
  {
    public CustomerProfiles()
    {
      CreateMap<CustomerCreateDto, Customer>();
      CreateMap<Customer, CustomerReadDto>();
      CreateMap<CustomerUpdateDto, Customer>();
    }
  }
}
