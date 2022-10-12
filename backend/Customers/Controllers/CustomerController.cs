using AutoMapper;
using backend.Authenticate.Services;
using backend.Customers.Dtos;
using backend.Customers.Models;
using backend.Customers.Services;
using backend.Messages;
using backend.models;
using backend.Shared.Dtos;
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

    public IMapper Mapper { get; }

    [HttpPost]
    [Authorize]
    public ActionResult<ReturnDto> Create([FromBody] CustomerCreateDto customer)
    {
      var customerModel = _mapper.Map<CustomerModel>(customer);

      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));

      customerModel.UserId = userId;
      customerModel.Balance = customer.Balance;
      var verifyCustomer = _customerService.GetCustomerByName(customerModel);

      var result = new ReturnDto();

      if (verifyCustomer == null)
      {
        _customerService.CreateCustomer(customerModel);
        _customerService.SaveChanges();

        result.Message = new Message
        {
          error = false,
          message = "Carteira criada com sucesso"
        };

        return Created("", result);
      }
      else
      {
        result.Message = new Message
        {
          error = true,
          message = "Nome de carteira já utilizado"
        };
        return BadRequest(result);
      }
    }
    [HttpGet]
    [Authorize]
    public ActionResult<GetAllCustomersReturnDto> GetAll()
    {
      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));

      var customers = _customerService.GetAllCustomers(userId);
      var result = new GetAllCustomersReturnDto();

      if (customers != null)
      {
        result.Message = new Message
        {
          error = false,
          message = "Sucesso ao adiquirir lista de carteiras"
        };

        var customersModel = _mapper.Map<List<CustomerReadDto>>(customers);
        result.Customers = customersModel;

        return Ok(result);
      }
      else
      {
        result.Message = new Message
        {
          error = true,
          message = "Falha ao adiquirir lista de carteiras"
        };
        return BadRequest(result);
      }
    }
    [HttpGet("{id}")]
    [Authorize]
    public ActionResult<GetCustomerByIdReturnDto> GetById([FromRoute] Guid Id)
    {

      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));

      var customer = _customerService.GetCustomerById(Id, userId);

      var result = new GetCustomerByIdReturnDto();

      if (customer != null)
      {
        var customerModel = _mapper.Map<CustomerReadDto>(customer);

        result.Message = new Message
        {
          error = false,
          message = "Sucesso ao adiquirir carteira"
        };

        result.Customer = customerModel;

        return Ok(result);
      }
      else
      {
        result.Message = new Message
        {
          error = true,
          message = "Falha ao adiquirir carteira"
        };
        return BadRequest(result);
      }
    }
    [HttpPut("{id}")]
    [Authorize]
    public ActionResult<ReturnDto> Update([FromRoute] Guid id, [FromBody] CustomerUpdateDto newCustomer)
    {
      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));

      var customer = _customerService.UpdateCustomer(id, userId, newCustomer);
      var result = new ReturnDto();
      if (customer != null)
      {
        result.Message = new Message
        {
          error = false,
          message = "Carteira alterada com sucesso"
        };

        return Ok(result);
      }
      else
      {
        result.Message = new Message
        {
          error = true,
          message = "Falha ao alterar carteira"
        };
        return BadRequest(result);
      }
    }
    [HttpDelete("{id}")]
    [Authorize]
    public ActionResult<ReturnDto> Delete([FromRoute] Guid id)
    {
      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));
      var succefullDelete = _customerService.DeleteCustomer(id, userId);

      var result = new ReturnDto();

      if (succefullDelete)
      {
        result.Message = new Message
        {
          error = false,
          message = "Carteira deletada com sucesso"
        };

        return Ok(result);
      }
      else
      {
        result.Message = new Message
        {
          error = true,
          message = "Falha ao deletar carteira"
        };
        return BadRequest(result);
      }
    }
  }
}
