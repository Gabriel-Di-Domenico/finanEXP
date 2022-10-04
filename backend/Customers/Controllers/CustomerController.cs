using AutoMapper;
using backend.Customers.Dtos;
using backend.Customers.Models;
using backend.Customers.Services;
using backend.Messages;
using backend.models;
using backend.Shared.Dtos;
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
    public ActionResult<ReturnDto> CreateCustomer([FromBody] CustomerCreateDto customer)
    {
      var customerModel = _mapper.Map<CustomerModel>(customer);
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
  }
}
