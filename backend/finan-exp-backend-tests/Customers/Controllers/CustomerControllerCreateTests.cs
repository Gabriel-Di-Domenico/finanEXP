using finan_exp_backend_tests.Customers.Controllers;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Shared.Dtos;
using Shared.Enums;
using Shared.Messages;

namespace Customers.Controllers
{
  public class CustomerControllerCreateTests
  {
    private CustomerControllerTestUtils CustomerControllerTestUtils = new CustomerControllerTestUtils();

    [Fact(DisplayName ="Create customer with sucessffully")]
    public async Task Create()
    {
      //Arrange
      var mocker = CustomerControllerTestUtils.GetMocker();
      var controller = CustomerControllerTestUtils.GetController(mocker);
      mocker.CustomerService.CreateCustomer(CustomerControllerTestUtils.CustomerInputs[0]).Returns(ResponseStatus.Ok);
      var expectedResult = new ReturnDto
      {
        Message = new Message
        {
          error = false,
          message = "Carteira criada com sucesso"
        }
      };
      //Act
      var result = await controller.Create(CustomerControllerTestUtils.CustomerInputs[0]);

      //Assert
      var output = result.Result as CreatedResult;
      output.StatusCode.Should().Be(201);
      output.Value.Should().BeEquivalentTo(expectedResult);
    }
    [Fact(DisplayName = "Create customer already exists")]
    public async Task CreateAlreadyExists()
    {
      //Arrange
      var mocker = CustomerControllerTestUtils.GetMocker();
      var controller = CustomerControllerTestUtils.GetController(mocker);
      mocker.CustomerService.CreateCustomer(CustomerControllerTestUtils.CustomerInputs[0]).Returns(ResponseStatus.AlreadyExists);
      var expectedResult = new ReturnDto
      {
        Message = new Message
        {
          error = true,
          message = "Nome de carteira já utilizado"
        }
      };
      //Act
      var result = await controller.Create(CustomerControllerTestUtils.CustomerInputs[0]);

      //Assert
      var output = result.Result as BadRequestObjectResult;
      output.StatusCode.Should().Be(400);
      output.Value.Should().BeEquivalentTo(expectedResult);
    }
  }
}
