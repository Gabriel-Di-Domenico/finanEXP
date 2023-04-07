using Categories.Dtos;
using Categories.Models;
using Categories.Services;
using finan_exp_backend_tests.Categories.Services.Categories;
using finan_exp_backend_tests.Supports;
using FluentAssertions;
using Shared.Interfaces;

namespace finan_exp_backend_tests.Categories.Services.Validations
{
  public class ValidationCategoryServiceTests : UnitTestBaseWithDBContext
  {
    [Fact(DisplayName = "Validate no validator apllied")]
    public async Task ValidateNoValidatorApplied()
    {
      var mocker = GetMocker();
      var service = GetService(mocker);

      await mocker.repository.AddAsync(new Category
      {
        Id = TestUtils.MockIds[0],
        IsArchived = false,
        Name = TestUtils.MockStrings[0],
        TransactionType = Shared.Enums.TransactionType.Revenue,
        UserId = TestUtils.MockIds[0]
      }, true);

      var input = new CategoryInput
      {
        IsArchived = false,
        Name = TestUtils.MockStrings[0],
        TransactionType = Shared.Enums.TransactionType.Revenue
      };
      var result = await service.Validate(input);
      result.Should().BeTrue();
    }
    [Fact(DisplayName = "Validate no match category name")]
    public async Task ValidateNoMatchCategoryName()
    {
      var mocker = GetMocker();
      var service = GetService(mocker);

      await mocker.repository.AddAsync(new Category
      {
        Id = TestUtils.MockIds[0],
        IsArchived = false,
        Name = TestUtils.MockStrings[0],
        TransactionType = Shared.Enums.TransactionType.Revenue,
        UserId = TestUtils.MockIds[0]
      }, true);

      var input = new CategoryInput
      {
        IsArchived = false,
        Name = TestUtils.MockStrings[1],
        TransactionType = Shared.Enums.TransactionType.Revenue
      };
      var result = await service.ByNameAlreadyExists().Validate(input);
      result.Should().BeTrue();
    }
    [Fact(DisplayName = "Validate match category name")]
    public async Task ValidateMatchCategoryName()
    {
      var mocker = GetMocker();
      var service = GetService(mocker);

      await mocker.repository.AddAsync(new Category
      {
        Id = TestUtils.MockIds[0],
        IsArchived = false,
        Name = TestUtils.MockStrings[0],
        TransactionType = Shared.Enums.TransactionType.Revenue,
        UserId = TestUtils.MockIds[0]
      }, true);

      var input = new CategoryInput
      {
        IsArchived = false,
        Name = TestUtils.MockStrings[0],
        TransactionType = Shared.Enums.TransactionType.Revenue
      };
      var result = await service.ByNameAlreadyExists().Validate(input);
      result.Should().BeFalse();
    }

    [Fact(DisplayName = "Validate no match category name inverted")]
    public async Task ValidateNoMatchCategoryNameINverted()
    {
      var mocker = GetMocker();
      var service = GetService(mocker);

      await mocker.repository.AddAsync(new Category
      {
        Id = TestUtils.MockIds[0],
        IsArchived = false,
        Name = TestUtils.MockStrings[0],
        TransactionType = Shared.Enums.TransactionType.Revenue,
        UserId = TestUtils.MockIds[0]
      }, true);

      var input = new CategoryInput
      {
        IsArchived = false,
        Name = TestUtils.MockStrings[1],
        TransactionType = Shared.Enums.TransactionType.Revenue
      };
      var result = await service.ByNameAlreadyExists(true).Validate(input);
      result.Should().BeFalse();
    }
    [Fact(DisplayName = "Validate match category name inverted")]
    public async Task ValidateMatchCategoryNameInverted()
    {
      var mocker = GetMocker();
      var service = GetService(mocker);

      await mocker.repository.AddAsync(new Category
      {
        Id = TestUtils.MockIds[0],
        IsArchived = false,
        Name = TestUtils.MockStrings[0],
        TransactionType = Shared.Enums.TransactionType.Revenue,
        UserId = TestUtils.MockIds[0]
      }, true);

      var input = new CategoryInput
      {
        IsArchived = false,
        Name = TestUtils.MockStrings[0],
        TransactionType = Shared.Enums.TransactionType.Revenue
      };
      var result = await service.ByNameAlreadyExists(true).Validate(input);
      result.Should().BeTrue();
    }
    private ValidationCategoryService GetService(Mocker mocker)
    {
      return new ValidationCategoryService(mocker.repository);
    }
    private Mocker GetMocker()
    {
      return new Mocker
      {
        repository = _repositoryProvider.GetRepository<Category>()
      };
    }
    private class Mocker
    {
      public IRepository<Category> repository { get; set; }
    }
  }
  
}
