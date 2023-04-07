using Categories.Models;
using finan_exp_backend_tests.Supports;
using FluentAssertions;
using NSubstitute;
using Shared.Enums;

namespace finan_exp_backend_tests.Categories.Services.Categories
{
  public class CategoriesServiceUpdateTests
  {
    private CategoryServiceTestsUtils categoryServiceTestsUtils = new CategoryServiceTestsUtils();

    [Fact(DisplayName = "Update category with sucessfully")]
    public async Task UpdateCategory()
    {
      //Arrange
      var mocker = categoryServiceTestsUtils.GetMocker();
      var service = categoryServiceTestsUtils.GetService(mocker);
      var input = categoryServiceTestsUtils.CategoryInputs[2];
      await mocker.Repository.BatchAddAsync(categoryServiceTestsUtils.Categories, true);

      var expectedResult = new Category
      {
        Id = TestUtils.MockIds[1],
        IsArchived = true,
        Name = TestUtils.MockStrings[2],
        TransactionType = TransactionType.Expense,
        UserId = TestUtils.MockIds[1],
      };

      mocker.FakeValidationCategoryService.ByNameAlreadyExists().Validate(input).Returns(true);
      //Act
      var result = await service.UpdateCategory(TestUtils.MockIds[1], input);

      //Assert
      result.Should().Be(ResponseStatus.Ok);

      var categoryResult = await mocker.Repository.FirstOrDefaultAsync(category => category.Id == TestUtils.MockIds[1]);
      categoryResult.Should().BeEquivalentTo(expectedResult);
    }

    [Fact(DisplayName = "Update category already exists")]
    public async Task UpdateCategoryAlreadyExists()
    {
      //Arrange
      var mocker = categoryServiceTestsUtils.GetMocker();
      var service = categoryServiceTestsUtils.GetService(mocker);
      var input = categoryServiceTestsUtils.CategoryInputs[2];
      var categories = categoryServiceTestsUtils.Categories;
      await mocker.Repository.BatchAddAsync(categories, true);

      var expectedResult = new Category
      {
        Id = TestUtils.MockIds[1],
        IsArchived = true,
        Name = TestUtils.MockStrings[2],
        TransactionType = TransactionType.Expense,
        UserId = TestUtils.MockIds[1],
      };

      mocker.FakeValidationCategoryService.ByNameAlreadyExists().Validate(input).Returns(false);
      //Act
      var result = await service.UpdateCategory(TestUtils.MockIds[1], input);

      //Assert
      result.Should().Be(ResponseStatus.AlreadyExists);

      var categoryResult = await mocker.Repository.FirstOrDefaultAsync(category => category.Id == TestUtils.MockIds[1]);
      categoryResult.Should().BeEquivalentTo(categories[1]);
    }
  }
}
