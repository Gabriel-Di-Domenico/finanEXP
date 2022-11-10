using backend.Categories.Dtos;
using backend.Categories.Models;
using backend.Shared.Classes;
using backend.Shared.Enums;

namespace backend.Categories.Services
{
  public interface ICategoriesService
  {
    ResponseStatus<List<Category>> GetAllCategories(Guid userId, GetAllFilter? filter);
    ResponseStatus<Category> GetCategoryById(Guid id, Guid userId);
    ResponseStatus UpdateCategory(Guid id, Guid userId, CategoryCreateDto newCategory);
    ResponseStatus DeleteCategory(Guid id, Guid userId);
    ResponseStatus CreateCategory(Category category);
    bool SaveChanges();
  }
}
