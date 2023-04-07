using Categories.Dtos;
using Categories.Models;
using finan_exp_backend_tests.Supports;
using FluentAssertions;
using Shared.Enums;

namespace finan_exp_backend_tests.Categories.Services.Categories
{
  public class CategoriesServiceDeleteTests
  {
    private CategoryServiceTestsUtils categoryServiceTestsUtils = new CategoryServiceTestsUtils();

    [Fact(DisplayName = "Delete category with successfully")]
    public async Task DeleteCategory()
    {
      //Arrange
      var mocker = categoryServiceTestsUtils.GetMocker();
      var service = categoryServiceTestsUtils.GetService(mocker);

      var categories = categoryServiceTestsUtils.Categories;

      await mocker.Repository.BatchAddAsync(categories, true);

      var expectedResult = categories.Skip(1).ToList();

      //Act
      var result = await service.DeleteCategory(TestUtils.MockIds[0]);

      //Assert
      result.Should().Be(ResponseStatus.Ok);

      var categoriesResult = await mocker.Repository.ToListAsync();
      categoriesResult.Should().BeEquivalentTo(expectedResult);
    }
  }
}
