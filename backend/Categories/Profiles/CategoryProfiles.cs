using AutoMapper;
using backend.Categories.Dtos;
using backend.Categories.Models;

namespace backend.Categories.Profiles
{
  public class CategoryProfiles : Profile
  {
    public CategoryProfiles()
    {
      CreateMap<CategoryCreateDto, Category>();
      CreateMap<Category, CategoryReadDto>();
    }
  }
}
