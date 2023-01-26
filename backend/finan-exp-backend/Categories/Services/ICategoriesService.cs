using Categories.Dtos;
using Categories.Models;
using Shared.Classes;
using Shared.Enums;

namespace Categories.Services
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
