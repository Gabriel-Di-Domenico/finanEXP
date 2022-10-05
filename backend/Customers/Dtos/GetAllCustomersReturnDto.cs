using backend.Shared.Dtos;

namespace backend.Customers.Dtos
{
  public class GetAllCustomersReturnDto : ReturnDto
  {
    public List<CustomerReadDto> Customers { get; set; }
  }
}
