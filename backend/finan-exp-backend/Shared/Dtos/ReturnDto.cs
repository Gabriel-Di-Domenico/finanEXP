using Shared.Messages;

namespace Shared.Dtos
{
  public class ReturnDto<ContentType>
  {
    public Message Message { get; set; }
    public ContentType? Content { get; set; }
  }
  public class ReturnDto
  {
    public Message Message { get; set; }
  }
}
