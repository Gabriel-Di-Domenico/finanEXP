using finan_exp_backend_tests.Supports;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Shared.Classes;
using Shared.Dtos;
using Shared.Enums;
using Shared.Messages;

namespace finan_exp_backend_tests.Customers.Controllers
{
  public class CustomerControllerDeleteTests
  {
    private CustomerControllerTestUtils CustomerControllerTestUtils = new CustomerControllerTestUtils();

    [Fact(DisplayName = "Delete customer with successfully")]
    public async Task DeleteCustomerWithSuccessfully()
    {
      //Arrange
      var mocker = CustomerControllerTestUtils.GetMocker();
      var controller = CustomerControllerTestUtils.GetController(mocker);

      mocker.CustomerService.DeleteCustomer(TestUtils.MockIds[0]).Returns(ResponseStatus.Ok);

      var expectedResult = new ReturnDto
      {
        Message = new Message
        {
          error = false,
          message = "Carteira deletada com sucesso"
        }
      };
      //Act
      var result = await controller.Delete(TestUtils.MockIds[0]);
      //Assert
      var output = result.Result as OkObjectResult;
      output.StatusCode.Should().Be(200);
      output.Value.Should().BeEquivalentTo(expectedResult);
    }
  }
}
