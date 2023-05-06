using finan_exp_backend_tests.Supports;
using FluentAssertions;
using Shared.Enums;

namespace finan_exp_backend_tests.Customers.Services
{
  public class CustomerServiceDeleteTests
  {
    private CustomerServiceTestUtils CustomerServiceTestUtils = new CustomerServiceTestUtils();

    [Fact(DisplayName = "Delete customer with sucessfully")]
    public async Task DeleteCustomerWithSucessfully()
    {
      //Arrange
      var mocker = CustomerServiceTestUtils.GetMocker();
      var service = CustomerServiceTestUtils.GetService(mocker);
      await mocker.Repository.AddAsync(CustomerServiceTestUtils.Customers[0], true);
      //Act
      var result = await service.DeleteCustomer(TestUtils.MockIds[0]);
      //Assert
      result.Should().Be(ResponseStatus.Ok);
      var customerResult = await mocker.Repository.FirstOrDefaultAsync(customer => customer.Id == TestUtils.MockIds[0]);
      customerResult.Should().BeNull();
    }
  }
}
