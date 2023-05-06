using Customers.Controllers;
using Customers.Services;
using finan_exp_backend_tests.Supports;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Shared.Dtos;
using Shared.Enums;
using Shared.Messages;

namespace finan_exp_backend_tests.Customers.Controllers.CustomerBalances
{
  public class CustomerBalanceControllerTests
  {
    [Fact(DisplayName = "Calculate customer balance with sucessfully")]
    public async Task CalculateCustomerBalanceWithSucessfully()
    {
      //Arrange
      var mocker = GetMocker();
      var controller = GetController(mocker);
      var expectedResult = new ReturnDto
      {
        Message = new Message
        {
          error = false,
          message = "Cálculo realizado com sucesso"
        }
      };
      //Act
      var result = await controller.CalculateCustomerBalance(TestUtils.MockIds[0]);
      //Assert
      var output = result.Result as OkObjectResult;
      output.StatusCode.Should().Be(200);
      output.Value.Should().BeEquivalentTo(expectedResult);
    }
    [Fact(DisplayName = "Calculate customer balance with error")]
    public async Task CalculateCustomerBalanceWithError()
    {
      //Arrange
      var mocker = GetMocker();
      var controller = GetController(mocker);
      mocker.FakeCustomerBalanceService.CalculateCustomerBalance(TestUtils.MockIds[0]).Returns(ResponseStatus.BadRequest);
      var expectedResult = new ReturnDto
      {
        Message = new Message
        {
          error = true,
          message = "Falha ao realizar o cálculo"
        }
      };
      //Act
      var result = await controller.CalculateCustomerBalance(TestUtils.MockIds[0]);
      //Assert
      var output = result.Result as BadRequestObjectResult;
      output.StatusCode.Should().Be(400);
      output.Value.Should().BeEquivalentTo(expectedResult);
    }
    public class Mocker
    {
      public ICustomerBalanceService FakeCustomerBalanceService { get; set; }
    }
    public Mocker GetMocker()
    {
      var mocker = new Mocker
      {
        FakeCustomerBalanceService = Substitute.For<ICustomerBalanceService>()
      };
      return mocker;
    }
    public CustomerBalanceController GetController(Mocker mocker)
    {
      var controller = new CustomerBalanceController(mocker.FakeCustomerBalanceService);
      return controller;
    }
  }
}
