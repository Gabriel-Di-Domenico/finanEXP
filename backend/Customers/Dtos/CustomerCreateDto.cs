namespace backend.Customers.Dtos
{
  public class CustomerCreateDto
  {
    public string Name { get; set; }

    public Guid UserId { get; set; }

    public string Type { get; set; }

  }
}
