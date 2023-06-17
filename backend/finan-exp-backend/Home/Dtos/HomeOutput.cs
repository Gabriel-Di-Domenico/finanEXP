using Home.Models;

namespace Home.Dtos
{
  public class HomeOutput : IHomeModel
  {
    public decimal TotalActualBalance { get; set; }
    public decimal TotalRevenues { get; set; }
    public decimal TotalExpenses { get; set; }
  }
}
