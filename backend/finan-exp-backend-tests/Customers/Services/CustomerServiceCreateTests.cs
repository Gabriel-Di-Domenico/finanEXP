using Customers.Dtos;
using Customers.Enums;
using Customers.Models;
using finan_exp_backend_tests.Supports;
using FluentAssertions;
using NSubstitute;
using Shared.Enums;

namespace finan_exp_backend_tests.Customers.Services
{
  public class CustomerServiceCreateTests
  {
    private CustomerServiceTestUtils CustomerServiceTestUtils = new CustomerServiceTestUtils();

    [Fact(DisplayName = "Create customer with sucessfully")]
    public async Task CreateCustomerWithSuccessfully()
    {
      //Arrange
      var mocker = CustomerServiceTestUtils.GetMocker();
      var service = CustomerServiceTestUtils.GetService(mocker);
      var expectedResult = new Customer
      {
        ActualBalance = 1200,
        InitialBalance = 1200,
        IsArchived = false,
        Name = TestUtils.MockStrings[0],
        TransferValue = 0,
        Type = CustomersTypeOptions.Bank
      };
      var input = CustomerServiceTestUtils.CustomerInputs[0];
      input.InitialBalance = 1200;
      //Act
      var result = await service.CreateCustomer(input);
      //Assert
      result.Should().Be(ResponseStatus.Ok);
      var customerResult = await mocker.Repository.FirstOrDefaultAsync();
      expectedResult.Id = customerResult.Id;
      customerResult.Should().BeEquivalentTo(expectedResult);
    }

    [Fact(DisplayName = "Create customer already exists")]
    public async Task CreateCustomerAlreadyExists()
    {
      //Arrange
      var mocker = CustomerServiceTestUtils.GetMocker();
      var service = CustomerServiceTestUtils.GetService(mocker);
      mocker.ValidateCustomerService.AlreadyExistsValidation(null)
        .ReturnsForAnyArgs(ResponseStatus.AlreadyExists);

      var input = CustomerServiceTestUtils.CustomerInputs[0];
      //Act
      var result = await service.CreateCustomer(input);
      //Assert
      result.Should().Be(ResponseStatus.AlreadyExists);
      var customerResult = await mocker.Repository.FirstOrDefaultAsync();
      customerResult.Should().BeNull();
    }
  }
}
