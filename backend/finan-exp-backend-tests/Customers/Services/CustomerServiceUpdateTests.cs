using Customers.Enums;
using Customers.Models;
using finan_exp_backend_tests.Supports;
using FluentAssertions;
using NSubstitute;
using Shared.Enums;

namespace finan_exp_backend_tests.Customers.Services
{
  public class CustomerServiceUpdateTests
  {
    private CustomerServiceTestUtils CustomerServiceTestUtils = new CustomerServiceTestUtils();
    [Fact(DisplayName = "Update customer with sucessfully")]
    public async Task UpdateCustomerWithSucessfully()
    {
      //Arrange
      var mocker = CustomerServiceTestUtils.GetMocker();
      var servive = CustomerServiceTestUtils.GetService(mocker);
      var input = CustomerServiceTestUtils.CustomerInputs[1];
      input.InitialBalance = 2000;
      var expectedResult = new Customer
      {
        ActualBalance = 1000,
        InitialBalance = 2000,
        IsArchived = false,
        Name = TestUtils.MockStrings[1],
        TransferValue = 0,
        Type = CustomersTypeOptions.Savings,
        Id = TestUtils.MockIds[0],
        UserId = TestUtils.MockIds[0]
      };
      await mocker.Repository.AddAsync(CustomerServiceTestUtils.Customers[0], true);
      //Act
      var result = await servive.UpdateCustomer(TestUtils.MockIds[0], input);
      //Assert
      result.Should().Be(ResponseStatus.Ok);
      var customerResult = await mocker.Repository.FirstOrDefaultAsync(customer => customer.Id == TestUtils.MockIds[0]);
      customerResult.Should().BeEquivalentTo(expectedResult);
    }

    [Fact(DisplayName = "Update customer already exists")]
    public async Task UpdateCustomerAlreadyExists()
    {
      //Arrange
      var mocker = CustomerServiceTestUtils.GetMocker();
      var servive = CustomerServiceTestUtils.GetService(mocker);
      var input = CustomerServiceTestUtils.CustomerInputs[1];
      var expectedResult = CustomerServiceTestUtils.Customers[0];
      mocker.ValidateCustomerService.ValidateUpdateCustomer(null).ReturnsForAnyArgs(ResponseStatus.AlreadyExists);

      await mocker.Repository.AddAsync(CustomerServiceTestUtils.Customers[0], true);
      //Act
      var result = await servive.UpdateCustomer(TestUtils.MockIds[0], input);
      //Assert
      result.Should().Be(ResponseStatus.AlreadyExists);
      var customerResult = await mocker.Repository.FirstOrDefaultAsync(customer => customer.Id == TestUtils.MockIds[0]);
      customerResult.Should().BeEquivalentTo(expectedResult);
    }

    [Fact(DisplayName = "Archive customer with sucessfully")]
    public async Task ArchiveCustomerWithSucessfully()
    {
      //Arrange
      var mocker = CustomerServiceTestUtils.GetMocker();
      var servive = CustomerServiceTestUtils.GetService(mocker);
      var input = CustomerServiceTestUtils.CustomerInputs[1];
      var expectedResult = CustomerServiceTestUtils.Customers[0];
      expectedResult.IsArchived = true;

      await mocker.Repository.AddAsync(CustomerServiceTestUtils.Customers[0], true);
      //Act
      var result = await servive.UpdateCustomer(TestUtils.MockIds[0], input);
      //Assert
      result.Should().Be(ResponseStatus.Ok);
      var customerResult = await mocker.Repository.FirstOrDefaultAsync(customer => customer.Id == TestUtils.MockIds[0]);
      customerResult.Should().BeEquivalentTo(expectedResult);
    }
  }
}
