using Customers.Models;
using FluentAssertions;
using Shared.Classes;
using Shared.Enums;

namespace finan_exp_backend_tests.Customers.Services
{
  public class CustomerServiceGetTests
  {
    private CustomerServiceTestUtils CustomerServiceTestUtils = new CustomerServiceTestUtils();
    [Fact(DisplayName ="Get all customers with sucessfully")]
    public async Task GetAllCustomersWithSucessfully()
    {
      //Arrange
      var mocker = CustomerServiceTestUtils.GetMocker();
      var service = CustomerServiceTestUtils.GetService(mocker);
      await mocker.Repository.AddAsync(CustomerServiceTestUtils.Customers[0], true);
      var filter = new GetAllFilter
      {

      };
      var expectedResult = new ResponseStatus<List<Customer>>
      {
        Status = ResponseStatus.Ok,
        Content = new List<Customer>
        {
          CustomerServiceTestUtils.Customers[0]
        }
      };
      //Act
      var result = await service.GetAllCustomers(filter);
      //Assert
      result.Should().BeEquivalentTo(expectedResult);
    }
  }
}
