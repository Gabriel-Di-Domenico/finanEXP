using Authenticate.Services;
using AutoMapper;
using Customers.Dtos;
using Customers.Models;
using Customers.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Classes;
using Shared.Dtos;
using Shared.Enums;
using Shared.Messages;

namespace Customers.Controllers
{
  [Route("/Customers")]
  [ApiController]
  public class CustomerController : ControllerBase
  {
    private readonly ICustomerService _customerService;
    private readonly IMapper _mapper;
    private readonly ICustomerBalanceService _customerBalanceService;
    private readonly CurrentUserProvider currentUserProvider;

    public CustomerController(ICustomerService customerService, IMapper mapper, ICustomerBalanceService customerBalanceService,
      CurrentUserProvider currentUserProvider)
    {
      _customerService = customerService;
      _mapper = mapper;
      _customerBalanceService = customerBalanceService;
      this.currentUserProvider = currentUserProvider;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<ReturnDto>> Create([FromBody] CustomerInput input)
    {
      
      var result = new ReturnDto();

      var createCustomerResult = await _customerService.CreateCustomer(input);

      if (createCustomerResult == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Carteira criada com sucesso"
        };

        return Created("", result);
      }
      else if (createCustomerResult == ResponseStatus.AlreadyExists)
      {
        result.Message = new Message
        {
          error = true,
          message = "Nome de carteira já utilizado"
        };
        return BadRequest(result);
      }
      throw new Exception("Error create customer");
    }
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<ReturnDto<List<CustomerOutput>>>> GetAll([FromQuery] GetAllFilter? filter)
    {
      var getAllcustomersResponse = await _customerService.GetAllCustomers(filter);
      var result = new ReturnDto<List<CustomerOutput>>();

      if (getAllcustomersResponse.Status == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Sucesso ao adiquirir lista de carteiras"
        };
        var customersModel = new List<CustomerOutput>();
        getAllcustomersResponse.Content.ForEach(customer =>
        {
          customersModel.Add(_mapper.Map<CustomerOutput>(customer));
        });
         
        result.Content = customersModel;

        return Ok(result);
      }
      throw new Exception("Error GetAll Customers");
    }
    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<ReturnDto<CustomerOutput>>> GetById([FromRoute] Guid Id)
    {
      var getCustomerByIdResult = await _customerService.GetCustomerById(Id);

      var result = new ReturnDto<CustomerOutput>();

      if (getCustomerByIdResult.Status == ResponseStatus.Ok)
      {
        var customerModel = _mapper.Map<CustomerOutput>(getCustomerByIdResult.Content);

        result.Message = new Message
        {
          error = false,
          message = "Sucesso ao adiquirir carteira"
        };

        result.Content = customerModel;

        return Ok(result);
      }
      throw new Exception("Error Get Customer By Id");
    }

    [HttpPut("{customerId}")]
    [Authorize]
    public async Task<ActionResult<ReturnDto>> Update(
      [FromRoute] Guid customerId,
      [FromBody] CustomerInput newCustomer,
      [FromQuery] UpdateFilter filter
      )
    {
      newCustomer.IsArchived = filter.ToArchive;
      
      var updateCustomerResult = await _customerService.UpdateCustomer(customerId, newCustomer);

      var result = new ReturnDto();
      if (updateCustomerResult == ResponseStatus.Ok)
      {
        var calculateCustomerBalanceResult = await _customerBalanceService.CalculateCustomerBalance(customerId);
        if (calculateCustomerBalanceResult == ResponseStatus.Ok)
        {
          result.Message = new Message
          {
            error = false,
            message = "Carteira alterada com sucesso"
          };

          return Ok(result);
        }
        throw new Exception("Error Calculate Customer balance from update customer");
      }
      else if (updateCustomerResult == ResponseStatus.AlreadyExists)
      {
        result.Message = new Message
        {
          error = true,
          message = "Nome de carteira já utilizado"
        };

        return BadRequest(result);
      }
      throw new Exception("Error Update Customer");
    }
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult<ReturnDto>> Delete([FromRoute] Guid id)
    {
      var deleteCustomerResult = await _customerService.DeleteCustomer(id);

      var result = new ReturnDto();

      if (deleteCustomerResult == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Carteira deletada com sucesso"
        };

        return Ok(result);
      }
      throw new Exception("Error Delete Customer");
    }
  }
}
