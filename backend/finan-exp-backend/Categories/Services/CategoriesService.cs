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
    public async Task<ResponseStatus<List<CategoryOutput>>> GetAll(GetAllFilter filter)
    {
      var categories = await _repository
        .WhereIf(filter.IsArchived.HasValue, category => category.IsArchived == filter.IsArchived)
        .WhereIf(filter.TransactionType.HasValue, category => category.TransactionType == filter.TransactionType)
        .ToListAsync();

      var categoriesOutput = _mapper.Map<List<CategoryOutput>>(categories);
       return new ResponseStatus<List<CategoryOutput>> { Status = ResponseStatus.Ok, Content = categoriesOutput };
    }
    public async Task<ResponseStatus<CategoryOutput>> GetById(Guid id)
    {
      var category = await _repository.FirstOrDefaultAsync(category => category.Id == id);
      if (category != null)
      {
        var categoryOutput = _mapper.Map<CategoryOutput>(category);

        return new ResponseStatus<CategoryOutput> { Status = ResponseStatus.Ok, Content = categoryOutput };

      }

      return new ResponseStatus<CategoryOutput>
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
