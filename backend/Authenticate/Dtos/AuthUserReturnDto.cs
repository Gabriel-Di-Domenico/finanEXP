using backend.Shared.Dtos;

namespace backend.Authenticate.Dtos
{
  public class AuthUserReturnDto : ReturnDto
  {
    public string JWT { get; set; }
  }
}
