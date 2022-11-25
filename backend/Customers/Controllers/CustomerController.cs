using AutoMapper;
using backend.Authenticate.Services;
using backend.Customers.Dtos;
using backend.Customers.Models;
using backend.Customers.Services;
using backend.Messages;
using backend.models;
using backend.Shared.Classes;
using backend.Shared.Dtos;
using backend.Shared.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Customers.Controllers
{
  [Route("/Customers")]
  [ApiController]
  public class CustomerController : ControllerBase
  {
    private readonly ICustomerService _customerService;
    private readonly IMapper _mapper;
    private readonly ICustomerBalanceService _customerBalanceService;

    public CustomerController(ICustomerService customerService, IMapper mapper, ICustomerBalanceService customerBalanceService)
    {
      _customerService = customerService;
      _mapper = mapper;
      _customerBalanceService = customerBalanceService;
    }

    [HttpPost]
    [Authorize]
    public ActionResult<ReturnDto> Create([FromBody] CustomerCreateDto customer)
    {
      var customerModel = _mapper.Map<Customer>(customer);

      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));

      customerModel.UserId = userId;

      var result = new ReturnDto();

      var createCustomerResult = _customerService.CreateCustomer(customerModel);
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
    public ActionResult<ReturnDto<List<CustomerReadDto>>> GetAll([FromQuery] GetAllFilter? filter)
    {
      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));

      var getAllcustomersResponse = _customerService.GetAllCustomers(userId,filter);
      var result = new ReturnDto<List<CustomerReadDto>>();

      if (getAllcustomersResponse.Status == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Sucesso ao adiquirir lista de carteiras"
        };

        var customersModel = _mapper.Map<List<CustomerReadDto>>(getAllcustomersResponse.Content);
        result.Content = customersModel;

        return Ok(result);
      }
      throw new Exception("Error GetAll Customers");
    }
    [HttpGet("{id}")]
    [Authorize]
    public ActionResult<ReturnDto<CustomerReadDto>> GetById([FromRoute] Guid Id)
    {

      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));

      var getCustomerByIdResult = _customerService.GetCustomerById(Id, userId);

      var result = new ReturnDto<CustomerReadDto>();

      if (getCustomerByIdResult.Status == ResponseStatus.Ok)
      {
        var customerModel = _mapper.Map<CustomerReadDto>(getCustomerByIdResult.Content);

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
    public ActionResult<ReturnDto> Update(
      [FromRoute] Guid customerId,
      [FromBody] CustomerUpdateDto newCustomer,
      [FromQuery] UpdateFilter filter
      )
    {
      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));

      if (filter.ToArchive != null)
      {
        newCustomer.IsArchived = filter.ToArchive;
      }
      var customerModel = _mapper.Map<Customer>(newCustomer);

      customerModel.UserId = userId;

      var updateCustomerResult = _customerService.UpdateCustomer(customerId, customerModel);

      var result = new ReturnDto();
      if (updateCustomerResult == ResponseStatus.Ok)
      {
        var calculateCustomerBalanceResult = _customerBalanceService.CalculateCustomerBalance(customerId, userId);
        if(calculateCustomerBalanceResult == ResponseStatus.Ok)
        {
          result.Message = new Message
          {
            error = false,
            message = "Carteira alterada com sucesso"
          };

          return Ok(result);
        }
        throw new Exception("Error Calculate Customer balance from update customer");
      }else if (updateCustomerResult == ResponseStatus.AlreadyExists)
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
    public ActionResult<ReturnDto> Delete([FromRoute] Guid id)
    {
      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));
      var deleteCustomerResult = _customerService.DeleteCustomer(id, userId);

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
