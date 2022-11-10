using AutoMapper;
using backend.Expenses.Dtos;
using backend.Expenses.Models;
using backend.Expenses.Services;
using backend.Messages;
using backend.Shared.Classes;
using backend.Shared.Dtos;
using backend.Shared.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Expenses.Controllers
{
  [Route("/Expenses")]
  [ApiController]
  public class ExpenseController : ControllerBase
  {
    private readonly IExpensesService _expensesService;
    private readonly IMapper _mapper;

    public ExpenseController(IExpensesService expensesService, IMapper mapper)
    {
      _expensesService = expensesService;
      _mapper = mapper;
    }

    [HttpPost]
    [Authorize]
    public ActionResult<ReturnDto> Create([FromBody] ExpenseCreateDto expense)
    {
      var expenseModel = _mapper.Map<Expense>(expense);

      var result = new ReturnDto();

      var createExpenseResult = _expensesService.CreateExpense(expenseModel);

      if (createExpenseResult == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Despesa criada com sucesso"
        };

        return Created("", result);
      }
      throw new Exception("Error create expense");

    }
    [HttpGet]
    [Authorize]
    public ActionResult<ReturnDto> GetAll([FromQuery] GetAllFilter filter)
    {
      var getAllExpensesResponse = _expensesService.GetAllExpenses(filter);
      var result = new ReturnDto<List<ExpenseReadDto>>();

      if (getAllExpensesResponse.Status == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Sucesso ao adiquirir lista de despesas"
        };

        var expensesModel = _mapper.Map<List<ExpenseReadDto>>(getAllExpensesResponse.Content);
        result.Content = expensesModel;

        return Ok(result);
      }
      throw new Exception("Error GetAll Categories");
    }
    [HttpGet("{id}")]
    [Authorize]
    public ActionResult<ReturnDto> GetById([FromRoute] Guid Id)
    {
      var getExpenseByIdResult = _expensesService.GetExpenseById(Id);

      var result = new ReturnDto<ExpenseReadDto>();

      if (getExpenseByIdResult.Status == ResponseStatus.Ok)
      {
        var customerModel = _mapper.Map<ExpenseReadDto>(getExpenseByIdResult.Content);

        result.Message = new Message
        {
          error = false,
          message = "Sucesso ao adquirir Despesa"
        };

        result.Content = customerModel;

        return Ok(result);
      }
      throw new Exception("Error Get Expense By Id");
    }

    [HttpPut("{id}")]
    [Authorize]
    public ActionResult<ReturnDto> Update(
      [FromRoute] Guid id,
      [FromBody] ExpenseCreateDto newExpense,
      [FromQuery] UpdateFilter filter)
    {
      var updateExpenseResult = _expensesService.UpdateExpense(id, newExpense);

      var result = new ReturnDto();
      if (updateExpenseResult == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Despesa alterada com sucesso"
        };

        return Ok(result);
      }
      throw new Exception("Error Update Expense");
    }
    [HttpDelete("{id}")]
    [Authorize]
    public ActionResult<ReturnDto> Delete([FromRoute] Guid id)
    {
      var deleteExpenseResult = _expensesService.DeleteExpense(id);

      var result = new ReturnDto();

      if (deleteExpenseResult == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Despesa deletada com sucesso"
        };

        return Ok(result);
      }
      throw new Exception("Error Delete Expense");
    }
  }

}

