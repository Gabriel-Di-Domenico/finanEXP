using Categories.Dtos;
using Categories.Models;
using Customers.Dtos;
using Shared.Interfaces;

namespace Categories.Services
{
  public class ValidationCategoryService : IValidationCategoryService
  {
    private bool NameAlreadyExistsValidation = false;
    private bool InvertNameAlreadyExistsValidation { get; set; }
    public IRepository<Category> _repository { get; }
    public ValidationCategoryService(IRepository<Category> repository)
    {
      _repository = repository;
    }

    public IValidationCategoryService ByNameAlreadyExists(bool invert = false)
    {
      NameAlreadyExistsValidation = true;
      InvertNameAlreadyExistsValidation = invert;
      return this;
    }
    public async Task<bool> Validate(CategoryInput input)
    {
      bool result = true;
      if(NameAlreadyExistsValidation)
      {
        var hasCategoryWithThisName = await _repository.AnyAsync(customer => customer.Name == input.Name && customer.TransactionType == input.TransactionType);
        result = InvertNameAlreadyExistsValidation ? hasCategoryWithThisName : !hasCategoryWithThisName;
      }
      return result;
    }
  }
}
