using Categories.Dtos;

namespace Categories.Services
{
  public interface IValidationCategoryService
  {
    public IValidationCategoryService ByNameAlreadyExists(bool invert = false);
    public Task<bool> Validate(CategoryInput input);
  }
}
