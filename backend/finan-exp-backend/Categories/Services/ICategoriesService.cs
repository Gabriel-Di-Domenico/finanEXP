using Categories.Dtos;
using Categories.Models;
using Shared.Classes;
using Shared.Enums;

namespace Categories.Services
{
  public interface ICategoriesService
  {
    Task<ResponseStatus<List<Category>>> GetAllCategories(GetAllFilter? filter);
    Task<ResponseStatus<Category>> GetCategoryById(Guid id);
    Task<ResponseStatus> UpdateCategory(Guid id, CategoryInput input);
    Task<ResponseStatus> DeleteCategory(Guid id);
    Task<ResponseStatus> CreateCategory(CategoryInput input);
  }
}
