using FluentAssertions;
using Home.Dtos;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Shared.Dtos;
using Shared.Enums;
using Shared.Messages;

namespace finan_exp_backend_tests.Home.Controllers
{
  public class HomeControllerGetTests
  {
    private HomeControllerTestUtils HomeControllerTestUtils = new HomeControllerTestUtils();

    [Fact(DisplayName = "Get mainValues with sucessffully")]
    public async Task Get()
    {
      //Arrange
      var mocker = HomeControllerTestUtils.GetMocker();
      var controller = HomeControllerTestUtils.GetController(mocker);

      mocker.FakeHomeService.Get().Returns(new ResponseStatus<HomeOutput>
      {
        Status = ResponseStatus.Ok,
        Content = HomeControllerTestUtils.HomeOutputs[0]
      });

      var expectedResult = new ReturnDto<HomeOutput>
      {
        Content = HomeControllerTestUtils.HomeOutputs[0],
        Message = new Message
        {
          error = false,
          message = "Sucesso ao adiquirir main values"
        }
      };
      //Act
      var result = await controller.Get();

      //Assert
      var output = result.Result as OkObjectResult;
      output.StatusCode.Should().Be(200);
      output.Value.Should().BeEquivalentTo(expectedResult);
    }
  }
}
