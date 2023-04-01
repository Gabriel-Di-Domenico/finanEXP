using AutoMapper;
using Categories.Dtos;
using Categories.Models;

namespace Categories.Profiles
{
  public class CategoryProfiles : Profile
  {
    public CategoryProfiles()
    {
      CreateMap<CategoryInput, Category>();
      CreateMap<Category, CategoryOutput>();
    }
  }
}
