using Categories.Dtos;
using finan_exp_backend_tests.Supports;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Shared.Dtos;
using Shared.Enums;
using Shared.Messages;

namespace Categories.Controllers
{
  public class CategoryControllerGetTests
  {
    [Fact(DisplayName = "Get all category with successfully")]
    public async Task GetAll()
    {
      var mocker = CategoryControllerTestsUtils.GetMocker();
      var categoryController = CategoryControllerTestsUtils.GetController(mocker);

      var categories = new List<CategoryOutput> {
        new CategoryOutput{
          Id= TestUtils.MockIds[0],
          IsArchived = false,
          Name = TestUtils.MockStrings[0],
          TransactionType = TransactionType.Revenue
        }
      };
      var responseStatus = new ResponseStatus<List<CategoryOutput>>
      {
        Content = categories,
        Status = ResponseStatus.Ok
      };
      var expectedResult = new ReturnDto<List<CategoryOutput>>
      {
        Content = categories,
        Message = new Message
        {
          error = false,
          message = "Sucesso ao adquirir lista de categorias"
        }
      };
      mocker.FakeCategoriesService.GetAll(null).Returns(responseStatus);

      var result = await categoryController.GetAll(null);

      var output = result.Result as OkObjectResult;
      output.StatusCode.Should().Be(200);
      output.Value.Should().BeEquivalentTo(expectedResult);
    }

    [Fact(DisplayName = "Get category by id with successfully")]
    public async Task GetById()
    {
      var mocker = CategoryControllerTestsUtils.GetMocker();
      var categoryController = CategoryControllerTestsUtils.GetController(mocker);

      var category = new CategoryOutput
      {
        Id = TestUtils.MockIds[0],
        IsArchived = false,
        Name = TestUtils.MockStrings[0],
        TransactionType = TransactionType.Revenue
      };

      var responseStatus = new ResponseStatus<CategoryOutput>
      {
        Content = category,
        Status = ResponseStatus.Ok
      };
      var expectedResult = new ReturnDto<CategoryOutput>
      {
        Content = category,
        Message = new Message
        {
          error = false,
          message = "Sucesso ao adquirir categoria"
        }
      };
      mocker.FakeCategoriesService.GetById(TestUtils.MockIds[0]).Returns(responseStatus);

      var result = await categoryController.GetById(TestUtils.MockIds[0]);

      var output = result.Result as OkObjectResult;
      output.StatusCode.Should().Be(200);
      output.Value.Should().BeEquivalentTo(expectedResult);
    }
    [Fact(DisplayName = "Get category not exists")]
    public async Task GetByIdNotExists()
    {
      var mocker = CategoryControllerTestsUtils.GetMocker();
      var categoryController = CategoryControllerTestsUtils.GetController(mocker);

      var responseStatus = new ResponseStatus<CategoryOutput>
      {
        Content = null,
        Status = ResponseStatus.NotFound
      };
      var expectedResult = new ReturnDto
      {
        Message = new Message
        {
          error = true,
          message = "Categoria não encontrada"
        }
      };
      mocker.FakeCategoriesService.GetById(TestUtils.MockIds[0]).Returns(responseStatus);

      var result = await categoryController.GetById(TestUtils.MockIds[0]);

      var output = result.Result as NotFoundObjectResult;
      output.StatusCode.Should().Be(404);
      output.Value.Should().BeEquivalentTo(expectedResult);
    }
  }
}
