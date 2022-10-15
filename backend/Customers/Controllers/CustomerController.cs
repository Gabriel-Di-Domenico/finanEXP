using AutoMapper;
using backend.Authenticate.Services;
using backend.Customers.Dtos;
using backend.Customers.Models;
using backend.Customers.Services;
using backend.Messages;
using backend.models;
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

    public CustomerController(ICustomerService customerService, IMapper mapper)
    {
      _customerService = customerService;
      _mapper = mapper;
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
    public ActionResult<GetAllCustomersReturnDto> GetAll()
    {
      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));

      var getAllcustomersResponse = _customerService.GetAllCustomers(userId);
      var result = new GetAllCustomersReturnDto();

      if (getAllcustomersResponse.Status == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Sucesso ao adiquirir lista de carteiras"
        };

        var customersModel = _mapper.Map<List<CustomerReadDto>>(getAllcustomersResponse.Content);
        result.Customers = customersModel;

        return Ok(result);
      }
      throw new Exception("Error GetAll Customers");
    }
    [HttpGet("{id}")]
    [Authorize]
    public ActionResult<GetCustomerByIdReturnDto> GetById([FromRoute] Guid Id)
    {

      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));

      var getCustomerByIdResult = _customerService.GetCustomerById(Id, userId);

      var result = new GetCustomerByIdReturnDto();

      if (getCustomerByIdResult.Status == ResponseStatus.Ok)
      {
        var customerModel = _mapper.Map<CustomerReadDto>(getCustomerByIdResult.Content);

        result.Message = new Message
        {
          error = false,
          message = "Sucesso ao adiquirir carteira"
        };

        result.Customer = customerModel;

        return Ok(result);
      }
      throw new Exception("Error Get Customer By Id");
    }

    [HttpPut("{id}")]
    [Authorize]
    public ActionResult<ReturnDto> Update([FromRoute] Guid id, [FromBody] CustomerUpdateDto newCustomer)
    {
      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));

      var updateCustomerResult = _customerService.UpdateCustomer(id, userId, newCustomer);
      var result = new ReturnDto();
      if (updateCustomerResult == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Carteira alterada com sucesso"
        };

        return Ok(result);
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
