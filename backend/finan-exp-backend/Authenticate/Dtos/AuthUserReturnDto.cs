using Shared.Dtos;
using Shared.Enums;

namespace Authenticate.Dtos
{
  public class AuthUserReturnDto : ReturnDto
  {
    public ResponseStatus? Status { get; set; }
    public string? JWT { get; set; }
  }
}
