using Customers.Dtos;
using Home.Dtos;
using Home.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Dtos;
using Shared.Enums;
using Shared.Messages;

namespace Home.Controllers
{
  [Route("/home")]
  [ApiController]
  public class HomeController : ControllerBase
  {
    private IHomeService _homeService { get; set; }
    public HomeController(IHomeService homeService)
    {
      _homeService = homeService;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<ReturnDto<CustomerOutput>>> Get()
    {
      var homeOutput = await _homeService.Get();

      var result = new ReturnDto<HomeOutput>();

      if (homeOutput.Status == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Sucesso ao adiquirir main values"
        };

        result.Content = homeOutput.Content;

        return Ok(result);
      }
      throw new Exception("Error Get main values");
    }
  }
}
