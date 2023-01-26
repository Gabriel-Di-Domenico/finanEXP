using Shared.Dtos;

namespace Authenticate.Dtos
{
  public class VerifyTokenReturnDto : ReturnDto
  {
    public string Token { get; set; }
  }
}
