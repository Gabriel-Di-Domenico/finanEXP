using Categories.Models;
using finan_exp_backend_tests.Supports;
using FluentAssertions;
using NSubstitute;
using Shared.Enums;

namespace finan_exp_backend_tests.Categories.Services.Categories
{
  public class CategoriesServiceCreateTests
  {
    private CategoryServiceTestsUtils categoryServiceTestsUtils = new CategoryServiceTestsUtils();

    [Fact(DisplayName = "Create category with sucessfully")]
    public async Task CreateCategory()
    {
      //Arrange
      var mocker = categoryServiceTestsUtils.GetMocker();
      var service = categoryServiceTestsUtils.GetService(mocker);
      var input = categoryServiceTestsUtils.CategoryInputs[0];
      var expectedResult = new Category
      {
        IsArchived = false,
        Name = TestUtils.MockStrings[0],
        TransactionType = TransactionType.Revenue,
      };
      mocker.FakeValidationCategoryService.ByNameAlreadyExists().Validate(input).Returns(true);
      //Act
      var result = await service.CreateCategory(input);

      //Assert
      result.Should().Be(ResponseStatus.Ok);
      var categoriesResult = await mocker.Repository.ToListAsync();
      expectedResult.Id = categoriesResult.First().Id;
      categoriesResult.First().Should().BeEquivalentTo(expectedResult);
    }
    [Fact(DisplayName = "Create category already exists")]
    public async Task CreateCategoryAlreadyExists()
    {
      //Arrange
      var mocker = categoryServiceTestsUtils.GetMocker();
      var service = categoryServiceTestsUtils.GetService(mocker);
      var input = categoryServiceTestsUtils.CategoryInputs[0];

      mocker.FakeValidationCategoryService.ByNameAlreadyExists().Validate(input).Returns(false);
      //Act
      var result = await service.CreateCategory(input);

      //Assert
      result.Should().Be(ResponseStatus.AlreadyExists);
      var categoriesResult = await mocker.Repository.ToListAsync();
      categoriesResult.Count().Should().Be(0);
    }
  }
}
