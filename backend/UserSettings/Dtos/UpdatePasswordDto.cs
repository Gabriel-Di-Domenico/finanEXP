namespace backend.UserSettings.Dtos
{
  public class UpdatePasswordDto
  {
    public string ActualPassword { get; set; }
    public string NewPassword { get; set; }
  }
}
