using backend.models;

namespace backend.dtos
{
  public class GetUserByIdReturnDto : ReturnDto
  {
    public UserReadDto User { get; set; }
  }
}
