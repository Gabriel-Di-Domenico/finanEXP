using backend.Shared.Dtos;

namespace backend.Authenticate.Dtos
{
  public class VerifyTokenReturnDto : ReturnDto
  {
    public string Token { get; set; }
  }
}
