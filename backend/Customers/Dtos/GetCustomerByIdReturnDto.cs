using backend.Shared.Dtos;

namespace backend.Customers.Dtos
{
  public class GetCustomerByIdReturnDto : ReturnDto
  {
    public CustomerReadDto Customer { get; set; }
  }
}
