using Categories.Dtos;
using finan_exp_backend_tests.Supports;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Shared.Dtos;
using Shared.Messages;

namespace Categories.Controllers
{
  public class CategoryControllerDeleteTests
  {
    [Fact(DisplayName = "Delete category with sucessfully")]
    public async Task DeleteCategory()
    {
      //Arrange
      var mocker = CategoryControllerTestsUtils.GetMocker();
      var categoryController = CategoryControllerTestsUtils.GetController(mocker);

      var expectedResult = new ReturnDto
      {
        Message = new Message
        {
          error = false,
          message = "Categoria deletada com sucesso"
        }
      };
      mocker.FakeCategoriesService.DeleteCategory(TestUtils.MockIds[0]).Returns(Shared.Enums.ResponseStatus.Ok);
      //Act
      var result = await categoryController.Delete(TestUtils.MockIds[0]);

      //Assert

      var output = result.Result as OkObjectResult;
      output.StatusCode.Should().Be(200);
      output.Value.Should().BeEquivalentTo(expectedResult);
    }
  }
}
