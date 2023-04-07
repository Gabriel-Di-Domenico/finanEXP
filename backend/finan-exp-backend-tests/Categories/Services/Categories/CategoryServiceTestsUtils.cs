using AutoMapper;
using Categories.Dtos;
using Categories.Models;
using Categories.Profiles;
using Categories.Services;
using finan_exp_backend_tests.Supports;
using NSubstitute;
using Shared.Enums;
using Shared.Interfaces;

namespace finan_exp_backend_tests.Categories.Services.Categories
{
  public class CategoryServiceTestsUtils : UnitTestBaseWithDBContext
  {
    public CategoriesService GetService(Mocker mocker)
    {
      return new CategoriesService(mocker.Repository, mocker.FakeValidationCategoryService, mocker.FakeMapper);
    }
    public Mocker GetMocker()
    {
      var mapperConfig = new MapperConfiguration(opt =>
      {
        opt.AddProfile(new CategoryProfiles());
      });
      return new Mocker
      {
        FakeMapper = mapperConfig.CreateMapper(),
        FakeValidationCategoryService = Substitute.For<IValidationCategoryService>(),
        Repository = _repositoryProvider.GetRepository<Category>()
      };
    }
    public class Mocker
    {
      public IRepository<Category> Repository { get; set; }
      public IValidationCategoryService FakeValidationCategoryService { get; set; }
      public IMapper FakeMapper { get; set; }
    }
    public List<CategoryInput> CategoryInputs = new List<CategoryInput> {
      new CategoryInput
      {
        IsArchived = false,
        Name = TestUtils.MockStrings[0],
        TransactionType = TransactionType.Revenue
      },
      new CategoryInput
      {
        IsArchived = false,
        Name = TestUtils.MockStrings[1],
        TransactionType = TransactionType.Expense
      },
      new CategoryInput
      {
        IsArchived = true,
        Name = TestUtils.MockStrings[2],
        TransactionType = TransactionType.Transfer
      }
    };
    public List<CategoryOutput> CategoriesOutput = new List<CategoryOutput> {
      new CategoryOutput
      {
        Id = TestUtils.MockIds[0],
        IsArchived = false,
        Name = TestUtils.MockStrings[0],
        TransactionType = TransactionType.Revenue
      },
      new CategoryOutput
      {
        Id = TestUtils.MockIds[1],
        IsArchived = false,
        Name = TestUtils.MockStrings[1],
        TransactionType = TransactionType.Expense
      },
      new CategoryOutput
      {
        Id = TestUtils.MockIds[2],
        IsArchived = true,
        Name = TestUtils.MockStrings[2],
        TransactionType = TransactionType.Transfer
      }
    };
    public List<Category> Categories = new List<Category> {
      new Category
      {
        Id = TestUtils.MockIds[0],
        UserId = TestUtils.MockIds[0],
        IsArchived = false,
        Name = TestUtils.MockStrings[0],
        TransactionType = TransactionType.Revenue
      },
      new Category
      {
        Id = TestUtils.MockIds[1],
        UserId = TestUtils.MockIds[1],
        IsArchived = false,
        Name = TestUtils.MockStrings[1],
        TransactionType = TransactionType.Expense
      },
      new Category
      {
        Id = TestUtils.MockIds[2],
        UserId = TestUtils.MockIds[2],
        IsArchived = true,
        Name = TestUtils.MockStrings[2],
        TransactionType = TransactionType.Transfer
      }
    };
  }
}
