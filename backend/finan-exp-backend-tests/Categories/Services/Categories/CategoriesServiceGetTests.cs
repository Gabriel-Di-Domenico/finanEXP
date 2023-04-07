using Categories.Dtos;
using finan_exp_backend_tests.Supports;
using FluentAssertions;
using Shared.Classes;
using Shared.Enums;

namespace finan_exp_backend_tests.Categories.Services.Categories
{
  public class CategoriesServiceGetTests
  {
    private CategoryServiceTestsUtils categoryServiceTestsUtils = new CategoryServiceTestsUtils();

    [Fact(DisplayName = "Get all categories with successfully")]
    public async Task GetAllCategories()
    {
      //Arrange
      var mocker = categoryServiceTestsUtils.GetMocker();
      var service = categoryServiceTestsUtils.GetService(mocker);
      var input = categoryServiceTestsUtils.CategoryInputs[0];

      var categories = categoryServiceTestsUtils.CategoriesOutput;

      await mocker.Repository.BatchAddAsync(categoryServiceTestsUtils.Categories, true);

      var expectedResult = new ResponseStatus<List<CategoryOutput>>
      {
        Content = categories,
        Status = ResponseStatus.Ok
      };

      //Act
      var result = await service.GetAll(new GetAllFilter());

      //Assert
      result.Should().BeEquivalentTo(expectedResult);
    }

    [Fact(DisplayName = "Get category by id with successfully")]
    public async Task GetCategoryById()
    {
      //Arrange
      var mocker = categoryServiceTestsUtils.GetMocker();
      var service = categoryServiceTestsUtils.GetService(mocker);

      var categories = categoryServiceTestsUtils.CategoriesOutput;

      await mocker.Repository.BatchAddAsync(categoryServiceTestsUtils.Categories, true);

      var expectedResult = new ResponseStatus<CategoryOutput>
      {
        Content = categories[0],
        Status = ResponseStatus.Ok
      };

      //Act
      var result = await service.GetById(TestUtils.MockIds[0]);

      //Assert
      result.Should().BeEquivalentTo(expectedResult);
    }
    [Fact(DisplayName = "Get category by id not exists")]
    public async Task GetCategoryByIdNoExists()
    {
      //Arrange
      var mocker = categoryServiceTestsUtils.GetMocker();
      var service = categoryServiceTestsUtils.GetService(mocker);

      var expectedResult = new ResponseStatus<CategoryOutput>
      {
        Content = null,
        Status = ResponseStatus.NotFound
      };

      //Act
      var result = await service.GetById(TestUtils.MockIds[0]);

      //Assert
      result.Should().BeEquivalentTo(expectedResult);
    }
  }
}
