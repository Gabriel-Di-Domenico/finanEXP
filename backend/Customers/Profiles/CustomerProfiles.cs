using AutoMapper;
using backend.Customers.Dtos;
using backend.Customers.Models;

namespace backend.Customers.Profiles
{
  public class CustomerProfiles : Profile
  {
    public CustomerProfiles()
    {

      CreateMap<CustomerCreateDto, CustomerModel>();
      CreateMap<CustomerModel, CustomerReadDto>();
    }
  }
}
