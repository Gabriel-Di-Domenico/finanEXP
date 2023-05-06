using Customers.Dtos;
using Customers.Models;
using finan_exp_backend_tests.Supports;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Shared.Dtos;
using Shared.Enums;
using Shared.Messages;

namespace finan_exp_backend_tests.Customers.Controllers
{
  public class CustomerControllerGetTests
  {
    private CustomerControllerTestUtils CustomerControllerTestUtils = new CustomerControllerTestUtils();

    [Fact(DisplayName = "Get all customer with sucessffully")]
    public async Task GetAll()
    {
      //Arrange
      var mocker = CustomerControllerTestUtils.GetMocker();
      var controller = CustomerControllerTestUtils.GetController(mocker);
      var customersOutput = new ResponseStatus<List<Customer>>
      {
        Status = ResponseStatus.Ok,
        Content = CustomerControllerTestUtils.Customers
      };
      mocker.CustomerService.GetAllCustomers(null).Returns(customersOutput);
      var expectedResult = new ReturnDto<List<CustomerOutput>>
      {
        Content = CustomerControllerTestUtils.CustomerOutputs,
        Message = new Message
        {
          error = false,
          message = "Sucesso ao adiquirir lista de carteiras"
        }
      };
      //Act
      var result = await controller.GetAll(null);

      //Assert
      var output = result.Result as OkObjectResult;
      output.StatusCode.Should().Be(200);
      output.Value.Should().BeEquivalentTo(expectedResult);
    }
    [Fact(DisplayName = "Get customer by id with sucessffully")]
    public async Task GetById()
    {
      //Arrange
      var mocker = CustomerControllerTestUtils.GetMocker();
      var controller = CustomerControllerTestUtils.GetController(mocker);
      var customerOutput = new ResponseStatus<Customer>
      {
        Status = ResponseStatus.Ok,
        Content = CustomerControllerTestUtils.Customers[0]
      };
      mocker.CustomerService.GetCustomerById(TestUtils.MockIds[0]).Returns(customerOutput);
      var expectedResult = new ReturnDto<CustomerOutput>
      {
        Content = CustomerControllerTestUtils.CustomerOutputs[0],
        Message = new Message
        {
          error = false,
          message = "Sucesso ao adiquirir carteira"
        }
      };
      //Act
      var result = await controller.GetById(TestUtils.MockIds[0]);

      //Assert
      var output = result.Result as OkObjectResult;
      output.StatusCode.Should().Be(200);
      output.Value.Should().BeEquivalentTo(expectedResult);
    }
  }
}
