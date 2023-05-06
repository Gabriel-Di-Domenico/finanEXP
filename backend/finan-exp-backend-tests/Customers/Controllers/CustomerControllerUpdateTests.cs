using finan_exp_backend_tests.Supports;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Shared.Classes;
using Shared.Dtos;
using Shared.Messages;

namespace finan_exp_backend_tests.Customers.Controllers
{
  public class CustomerControllerUpdateTests
  {
    private CustomerControllerTestUtils CustomerControllerTestUtils = new CustomerControllerTestUtils();

    [Fact(DisplayName = "Update customer with successfully")]
    public async Task UpdateCustomerWithSuccessfully()
    {
      //Arrange
      var mocker = CustomerControllerTestUtils.GetMocker();
      var controller = CustomerControllerTestUtils.GetController(mocker);
      var input = CustomerControllerTestUtils.CustomerInputs[0];
      mocker.CustomerService.UpdateCustomer(TestUtils.MockIds[0], input).Returns(Shared.Enums.ResponseStatus.Ok);

      var expectedResult = new ReturnDto
      {
        Message = new Message
        {
          error = false,
          message = "Carteira alterada com sucesso"
        }
      };
      //Act
      var result = await controller.Update(TestUtils.MockIds[0], input, new UpdateFilter {
      });
      //Assert
      var output = result.Result as OkObjectResult;
      output.StatusCode.Should().Be(200);
      output.Value.Should().BeEquivalentTo(expectedResult);
    }

    [Fact(DisplayName = "Update customer already exists")]
    public async Task UpdateCustomerAlreadyExists()
    {
      //Arrange
      var mocker = CustomerControllerTestUtils.GetMocker();
      var controller = CustomerControllerTestUtils.GetController(mocker);
      var input = CustomerControllerTestUtils.CustomerInputs[0];
      mocker.CustomerService.UpdateCustomer(TestUtils.MockIds[0], input).Returns(Shared.Enums.ResponseStatus.AlreadyExists);

      var expectedResult = new ReturnDto
      {
        Message = new Message
        {
          error = true,
          message = "Nome de carteira já utilizado"
        }
      };
      //Act
      var result = await controller.Update(TestUtils.MockIds[0], input, new UpdateFilter
      {
      });
      //Assert
      var output = result.Result as BadRequestObjectResult;
      output.StatusCode.Should().Be(400);
      output.Value.Should().BeEquivalentTo(expectedResult);
    }
  }
}
