using AutoMapper;
using Customers.Dtos;
using Customers.Models;

namespace Customers.Profiles
{
  public class CustomerProfiles : Profile
  {
    public CustomerProfiles()
    {
      CreateMap<CustomerInput, Customer>();
      CreateMap<Customer, CustomerOutput>();
      CreateMap<CustomerInput, Customer>();
      CreateMap<Customer, CustomerInput>();
    }
  }
}
