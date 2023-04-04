using Categories.Controllers;
using Categories.Dtos;
using finan_exp_backend_tests.Supports;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Shared.Dtos;
using Shared.Messages;

namespace finan_exp_backend_tests.Categories.Controllers
{
  public class CategoryControllerCreateTests
  {
    [Fact(DisplayName = "Create category with sucessfully")]
    public async Task CreateCategory()
    {
      //Arrange
      var mocker = CategoryControllerTestsUtils.GetMocker();
      var categoryController = CategoryControllerTestsUtils.GetController(mocker);

      var input = new CategoryInput
      {
        IsArchived = false,
        Name = TestUtils.MockStrings[0],
        TransactionType = Shared.Enums.TransactionType.Revenue
      };
      mocker.FakeCategoriesService.CreateCategory(input).Returns(Shared.Enums.ResponseStatus.Ok);
      //Act
      var result = await categoryController.Create(input);

      //Assert

      var output = result.Result as CreatedResult;
      var value = output.Value as ReturnDto;
      output.StatusCode.Should().Be(201);
      value.Message.Should().BeEquivalentTo(new Message
      {
        error = false,
        message = "Categoria criada com sucesso"
      });
      await mocker.FakeCategoriesService.ReceivedWithAnyArgs(1).CreateCategory(null);
    }
    [Fact(DisplayName = "Create category already Exists")]
    public async Task CreateCategoryAlreadyExists()
    {
      //Arrange
      var mocker = CategoryControllerTestsUtils.GetMocker();
      var categoryController = CategoryControllerTestsUtils.GetController(mocker);
      var input = new CategoryInput
      {
        IsArchived = false,
        Name = TestUtils.MockStrings[0],
        TransactionType = Shared.Enums.TransactionType.Revenue
      };
      mocker.FakeCategoriesService.CreateCategory(input).Returns(Shared.Enums.ResponseStatus.AlreadyExists);
      //Act
      var result = await categoryController.Create(input);

      //Assert

      var output = result.Result as CreatedResult;
      var value = output.Value as ReturnDto;
      output.StatusCode.Should().Be(400);
      value.Message.Should().BeEquivalentTo(new Message
      {
        error = true,
        message = "Nome da categoria já utilizado"
      });
      await mocker.FakeCategoriesService.ReceivedWithAnyArgs(1).CreateCategory(null);
    }

   
  }
}
