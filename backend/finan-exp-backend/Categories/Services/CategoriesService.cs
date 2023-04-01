using AutoMapper;
using Categories.Dtos;
using Categories.Models;
using Contexts;
using Microsoft.EntityFrameworkCore;
using Shared.Classes;
using Shared.Enums;
using Shared.Extensions;
using Shared.Interfaces;

namespace Categories.Services
{
  public class CategoriesService : ICategoriesService
  {
    private readonly IRepository<Category> _repository;
    private readonly IValidationCategoryService _validationCategoryService;

    public IMapper _mapper { get; }

    public CategoriesService(IRepository<Category> repository,
      IValidationCategoryService validationCategoryService, IMapper mapper)
    {
      _repository = repository;
      _validationCategoryService = validationCategoryService;
      _mapper = mapper;
    }
    public async Task<ResponseStatus> CreateCategory(CategoryInput input)
    {
      var validated = await _validationCategoryService
        .ByNameAlreadyExists()
        .Validate(input);

      if (validated)
      {
        var category = _mapper.Map<Category>(input);
        category.IsArchived = false;
        await _repository.AddAsync(category, true);

        return ResponseStatus.Ok;
      }
      else
      {
        return ResponseStatus.AlreadyExists;
      }
    }
    public async Task<ResponseStatus<List<Category>>> GetAllCategories(GetAllFilter? filter)
    {
      var categories = await _repository
        .WhereIf(filter.IsArchived.HasValue, category => category.IsArchived == filter.IsArchived)
        .WhereIf(filter.TransactionType.HasValue, category => category.TransactionType == filter.TransactionType)
        .ToListAsync();

       return new ResponseStatus<List<Category>> { Status = ResponseStatus.Ok, Content = categories };
    }
    public Category? GetCategoryByName(Category newCategory)
    {
      return _repository.FirstOrDefault(category =>
        category.UserId == newCategory.UserId
        && category.Name == newCategory.Name
      );
    }
    public async Task<ResponseStatus<Category>> GetCategoryById(Guid id)
    {
      var category = await _repository.FirstOrDefaultAsync(category => category.Id == id);
      if (category != null)
      {

        return new ResponseStatus<Category> { Status = ResponseStatus.Ok, Content = category };

      }

      return new ResponseStatus<Category>
      {
        Status = ResponseStatus.NotFound,
      };
    }

    public async Task<ResponseStatus> UpdateCategory(Guid id, CategoryInput input)
    {
      var getCategoryByIdResult = await _repository.FirstOrDefaultAsync(category => category.Id == id);

      var validated = await _validationCategoryService
        .ByNameAlreadyExists()
        .Validate(input);
      if (validated)
      {
        if (input.IsArchived != null)
        {
          getCategoryByIdResult.IsArchived = (bool)input.IsArchived;
        }

        getCategoryByIdResult.Name = input.Name;

        _repository.Update(getCategoryByIdResult, true);

        return ResponseStatus.Ok;
      }
      else
      {
        return ResponseStatus.AlreadyExists;
      }
    }
    public async Task<ResponseStatus> DeleteCategory(Guid id)
    {
      var getCategoryByIdResult = await _repository.FirstOrDefaultAsync(category => category.Id == id);
      
        _repository.Remove(getCategoryByIdResult, true);

        return ResponseStatus.Ok;

    }

  }
}
