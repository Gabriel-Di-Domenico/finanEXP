using backend.Shared.Dtos;
using backend.Shared.Enums;

namespace backend.Authenticate.Dtos
{
  public class AuthUserReturnDto : ReturnDto
  {
    public ResponseStatus? Status { get; set; }
    public string? JWT { get; set; }
  }
}
