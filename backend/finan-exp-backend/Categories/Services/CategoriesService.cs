using Categories.Dtos;
using Categories.Models;
using Contexts;
using Shared.Classes;
using Shared.Enums;

namespace Categories.Services
{
  public class CategoriesService : ICategoriesService
  {
    private readonly FinEXPDatabaseContext _context;

    public CategoriesService(FinEXPDatabaseContext context)
    {
      _context = context;
    }
    public ResponseStatus CreateCategory(Category category)
    {
      var categoryFromDatabase = GetCategoryByName(category);
      if (categoryFromDatabase == null)
      {
        category.IsArchived = false;
        _context.Categories.Add(category);
        SaveChanges();
        return ResponseStatus.Ok;
      }
      else
      {
        return ResponseStatus.AlreadyExists;
      }
    }

    public bool SaveChanges()
    {
      return _context.SaveChanges() >= 0;
    }

    public ResponseStatus<List<Category>> GetAllCategories(Guid userId, GetAllFilter? filter)
    {
      var categories = new List<Category>();
      if (filter.IsArchived == null)
      {
        categories = _context.Categories.Where(category => category.UserId == userId).ToList();
      }
      else if (filter.IsArchived != null)
      {
        categories = _context.Categories.Where(category => category.UserId == userId)
          .Where(category => filter.TransactionType != null ? category.TransactionType == filter.TransactionType : true)
          .Where(category => category.IsArchived == (filter.IsArchived != null ? filter.IsArchived : false)).ToList();
      }
      else
      {
        categories = _context.Categories.Where(category => category.UserId == userId).ToList();
      }

      if (categories != null)
      {
        return new ResponseStatus<List<Category>> { Status = ResponseStatus.Ok, Content = categories };
      }

      return new ResponseStatus<List<Category>>
      {
        Status = ResponseStatus.NotFound,
      };
    }
    public Category? GetCategoryByName(Category newCategory)
    {
      return _context.Categories.FirstOrDefault(category =>
        category.UserId == newCategory.UserId
        && category.Name == newCategory.Name
      );
    }
    public ResponseStatus<Category> GetCategoryById(Guid id, Guid userId)
    {
      var category = _context.Categories.FirstOrDefault(category => category.Id == id && category.UserId == userId);
      if (category != null)
      {

        return new ResponseStatus<Category> { Status = ResponseStatus.Ok, Content = category };

      }

      return new ResponseStatus<Category>
      {
        Status = ResponseStatus.NotFound,
      };
    }

    public ResponseStatus UpdateCategory(Guid id, Guid userId, CategoryCreateDto newCategory)
    {
      var getCategoryByIdResult = GetCategoryById(id, userId);

      if (getCategoryByIdResult.Status == ResponseStatus.Ok)
      {
        if (newCategory.IsArchived != null)
        {
          getCategoryByIdResult.Content.IsArchived = (bool)newCategory.IsArchived;
        }

        getCategoryByIdResult.Content.Name = newCategory.Name;

        _context.Categories.Update(getCategoryByIdResult.Content);
        SaveChanges();
        return ResponseStatus.Ok;
      }
      return ResponseStatus.BadRequest;
    }
    public ResponseStatus DeleteCategory(Guid id, Guid userId)
    {
      var getCategoryByIdResult = GetCategoryById(id, userId);
      if (getCategoryByIdResult.Status == ResponseStatus.Ok)
      {
        _context.Categories.Remove(getCategoryByIdResult.Content);
        SaveChanges();
        return ResponseStatus.Ok;
      }
      return ResponseStatus.BadRequest;
    }

  }
}
