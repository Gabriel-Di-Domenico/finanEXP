namespace Home.Models
{
  public class Home : IHomeModel
  {
    public decimal TotalActualBalance { get; set; }
    public decimal TotalRevenues { get; set; }
    public decimal TotalExpenses { get; set; }
  }
}
