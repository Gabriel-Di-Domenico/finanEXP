namespace Home.Models
{
  public interface IHomeModel
  {
    public decimal TotalActualBalance { get; set; }
    public decimal TotalRevenues { get; set; }
    public decimal TotalExpenses { get; set; }
  }
}
