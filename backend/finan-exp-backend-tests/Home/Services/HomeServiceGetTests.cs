using FluentAssertions;
using Home.Dtos;
using Shared.Enums;

namespace finan_exp_backend_tests.Home.Services
{
  public class HomeServiceGetTests
  {
    private HomeServiceTestUtils HomeServiceTestUtils = new HomeServiceTestUtils();

    [Fact(DisplayName = "Get mainValues with sucessffully")]
    public async Task Get()
    {
      //Arrange
      var mocker = HomeServiceTestUtils.GetMocker();
      var service = HomeServiceTestUtils.GetController(mocker);

      await mocker.CustomersRepository.BatchAddAsync(HomeServiceTestUtils.Customers, true);
      await mocker.TransactionRepository.BatchAddAsync(HomeServiceTestUtils.Transactions, true);

      var expectedResult = new ResponseStatus<HomeOutput>
      {
        Content = HomeServiceTestUtils.HomeOutputs[0],
        Status = ResponseStatus.Ok
      };
      //Act
      var result = await service.Get();

      //Assert
      result.Should().BeEquivalentTo(expectedResult);
    }
  }
}
