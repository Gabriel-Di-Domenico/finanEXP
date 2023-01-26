namespace Shared.Enums
{
  public class ResponseStatus<ContentType>
  {
    public ContentType Content { get; set; }
    public ResponseStatus Status { get; set; }

  }
  public enum ResponseStatus
  {
    Ok = 0,
    AlreadyExists = 1,
    Unauthorized = 2,
    NotFound = 3,
    BadRequest = 4
  }

}
