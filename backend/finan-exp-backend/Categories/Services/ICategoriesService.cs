using Categories.Dtos;
using Categories.Models;
using Shared.Classes;
using Shared.Enums;

namespace Categories.Services
{
  public interface ICategoriesService
  {
    Task<ResponseStatus<List<CategoryOutput>>> GetAll(GetAllFilter? filter);
    Task<ResponseStatus<CategoryOutput>> GetById(Guid id);
    Task<ResponseStatus> UpdateCategory(Guid id, CategoryInput input);
    Task<ResponseStatus> DeleteCategory(Guid id);
    Task<ResponseStatus> CreateCategory(CategoryInput input);
  }
}
