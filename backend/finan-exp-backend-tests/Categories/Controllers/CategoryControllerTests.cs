using AutoMapper;
using Categories.Controllers;
using Categories.Dtos;
using Categories.Services;
using finan_exp_backend_tests.Supports;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;

namespace finan_exp_backend_tests.Categories.Controllers
{
  public class CategoryControllerTests
  {
    [Fact(DisplayName = "Create category with sucessfully")]
    public void CreateCategory()
    {
      //Arrange
      var fakeCategoryService = Substitute.For<ICategoriesService>();
      var fakeMapper = Substitute.For<IMapper>();
      var categoryController = new CategoryController(fakeCategoryService, fakeMapper);

      var input = new CategoryCreateDto
      {
        IsArchived = false,
        Name = TestUtils.MockStrings[0],
        TransactionType = Shared.Enums.TransactionType.Revenue
      };
      //Act
      var result = categoryController.Create(input);

      //Assert

      var output = result.Result as OkResult;
      output.StatusCode.Should().Be(200);

      fakeCategoryService.ReceivedWithAnyArgs(1).CreateCategory(null);
    }
  }
}
