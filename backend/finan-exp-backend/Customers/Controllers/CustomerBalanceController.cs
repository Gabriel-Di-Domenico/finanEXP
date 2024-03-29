using Authenticate.Services;
using Customers.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Dtos;
using Shared.Enums;
using Shared.Messages;

namespace Customers.Controllers
{
  [Route("/Customers/Balance")]
  [ApiController]
  public class CustomerBalanceController : ControllerBase
  {
    private readonly ICustomerBalanceService _customerBalanceService;

    public CustomerBalanceController(ICustomerBalanceService customerBalanceService)
    {
      _customerBalanceService = customerBalanceService;
    }
    [HttpPut("{customerId}")]
    [Authorize]
    public async Task<ActionResult<ReturnDto>> CalculateCustomerBalance([FromRoute] Guid customerId)
    {
      var result = new ReturnDto();

      var calculateCustomerBalanceResult = await _customerBalanceService.CalculateCustomerBalance(customerId);
      if (calculateCustomerBalanceResult == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Cálculo realizado com sucesso"
        };

        return Ok(result);
      }
      else if (calculateCustomerBalanceResult == ResponseStatus.BadRequest)
      {
        result.Message = new Message
        {
          error = true,
          message = "Falha ao realizar o cálculo"
        };
        return BadRequest(result);
      }
      throw new Exception("Error Calculate Customer Balance");
    }
  }
}
