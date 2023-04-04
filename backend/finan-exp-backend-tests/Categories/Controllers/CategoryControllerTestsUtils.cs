using AutoMapper;
using Categories.Services;
using NSubstitute;

namespace Categories.Controllers
{
  public static class CategoryControllerTestsUtils
  {
    public static CategoryController GetController(Mocker mocker)
    {
      return new CategoryController(mocker.FakeCategoriesService);
    }
    public static Mocker GetMocker()
    {
      return new Mocker
      {
        FakeCategoriesService = Substitute.For<ICategoriesService>(),
      };
    }
    public class Mocker
    {
      public ICategoriesService FakeCategoriesService { get; set; }
    }
  }
}
