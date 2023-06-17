using AutoMapper;
using Customers.Profiles;
using finan_exp_backend_tests.Supports;
using Home.Controllers;
using Home.Dtos;
using Home.Services;
using NSubstitute;

namespace finan_exp_backend_tests.Home.Controllers
{
  public class HomeControllerTestUtils : UnitTestBaseWithDBContext
  {
    public List<HomeOutput> HomeOutputs = new List<HomeOutput>
    {
      new HomeOutput
      {
        TotalActualBalance = 6000,
        TotalRevenues = 30,
        TotalExpenses = 70
      }
    };
    public HomeController GetController(Mocker mocker)
    {
      return new HomeController(mocker.FakeHomeService);
    }
    public Mocker GetMocker()
    {
      var mapperConfig = new MapperConfiguration(opt =>
      {
        opt.AddProfile(new CustomerProfiles());
      });
      return new Mocker
      {
        FakeHomeService = Substitute.For<IHomeService>()
      };
    }
    public class Mocker
    {
      public IHomeService FakeHomeService { get; set; }
    }
  }
}

