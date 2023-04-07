using Categories.Dtos;
using finan_exp_backend_tests.Supports;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Shared.Classes;
using Shared.Dtos;
using Shared.Enums;
using Shared.Messages;

namespace Categories.Controllers
{
  public class CategoryControllerUpdateTests
  {
    [Fact(DisplayName = "Update category with successfully")]
    public async Task UpdateCategory()
    {
      var mocker = CategoryControllerTestsUtils.GetMocker();
      var categoryController = CategoryControllerTestsUtils.GetController(mocker);

      var expectedResult = new ReturnDto
      {
        Message = new Message
        {
          error = false,
          message = "Categoria alterada com sucesso"
        }
      };
      var input = new CategoryInput
      {
        IsArchived = false,
        Name = TestUtils.MockStrings[0],
        TransactionType = TransactionType.Revenue
      };

      mocker.FakeCategoriesService.UpdateCategory(TestUtils.MockIds[0], input).Returns(ResponseStatus.Ok);

      var filter = new UpdateFilter
      {
        ToArchive = false
      };
      var result = await categoryController.Update(TestUtils.MockIds[0], input, filter);

      var output = result.Result as OkObjectResult;
      output.StatusCode.Should().Be(200);
      output.Value.Should().BeEquivalentTo(expectedResult);
    }

    [Fact(DisplayName = "Update category already exists")]
    public async Task UpdateCategorAlreadyExists()
    {
      var mocker = CategoryControllerTestsUtils.GetMocker();
      var categoryController = CategoryControllerTestsUtils.GetController(mocker);

      var expectedResult = new ReturnDto
      {
        Message = new Message
        {
          error = true,
          message = "Nome da categoria já utilizado"
        }
      };
      var input = new CategoryInput
      {
        IsArchived = false,
        Name = TestUtils.MockStrings[0],
        TransactionType = TransactionType.Revenue
      };

      mocker.FakeCategoriesService.UpdateCategory(TestUtils.MockIds[0], input).Returns(ResponseStatus.AlreadyExists);

      var filter = new UpdateFilter
      {
        ToArchive = false
      };
      var result = await categoryController.Update(TestUtils.MockIds[0], input, filter);

      var output = result.Result as BadRequestObjectResult;
      output.StatusCode.Should().Be(400);
      output.Value.Should().BeEquivalentTo(expectedResult);
    }
  }
}
