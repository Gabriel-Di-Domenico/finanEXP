using AutoMapper;
using backend.Transactions.Dtos;
using backend.Transactions.Models;
using backend.Transactions.Services;
using backend.Messages;
using backend.Shared.Classes;
using backend.Shared.Dtos;
using backend.Shared.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Transactions.Controllers
{
  [Route("/Transactions")]
  [ApiController]
  public class TransactionController : ControllerBase
  {
    private readonly ITransactionService _transactionsService;
    private readonly IMapper _mapper;

    public TransactionController(ITransactionService transactionsService, IMapper mapper)
    {
      _transactionsService = transactionsService;
      _mapper = mapper;
    }

    [HttpPost]
    [Authorize]
    public ActionResult<ReturnDto> Create([FromBody] TransactionCreateDto transaction)
    {
      var transactionModel = _mapper.Map<Transaction>(transaction);

      var result = new ReturnDto();

      var createTransactionResult = _transactionsService.CreateTransaction(transactionModel);

      if (createTransactionResult == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Despesa criada com sucesso"
        };

        return Created("", result);
      }
      throw new Exception("Error create transaction");

    }
    [HttpGet]
    [Authorize]
    public ActionResult<ReturnDto> GetAll([FromQuery] GetAllFilter filter)
    {
      var getAllTransactionsResponse = _transactionsService.GetAllTransactions(filter);
      var result = new ReturnDto<List<TransactionReadDto>>();

      if (getAllTransactionsResponse.Status == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Sucesso ao adiquirir lista de despesas"
        };

        var transactionsModel = _mapper.Map<List<TransactionReadDto>>(getAllTransactionsResponse.Content);
        result.Content = transactionsModel;

        return Ok(result);
      }
      throw new Exception("Error GetAll Categories");
    }
    [HttpGet("{id}")]
    [Authorize]
    public ActionResult<ReturnDto> GetById([FromRoute] Guid Id)
    {
      var getTransactionByIdResult = _transactionsService.GetTransactionById(Id);

      var result = new ReturnDto<TransactionReadDto>();

      if (getTransactionByIdResult.Status == ResponseStatus.Ok)
      {
        var customerModel = _mapper.Map<TransactionReadDto>(getTransactionByIdResult.Content);

        result.Message = new Message
        {
          error = false,
          message = "Sucesso ao adquirir Despesa"
        };

        result.Content = customerModel;

        return Ok(result);
      }
      throw new Exception("Error Get Transaction By Id");
    }

    [HttpPut("{id}")]
    [Authorize]
    public ActionResult<ReturnDto> Update(
      [FromRoute] Guid id,
      [FromBody] TransactionCreateDto newTransaction,
      [FromQuery] UpdateFilter filter)
    {
      var updateTransactionResult = _transactionsService.UpdateTransaction(id, newTransaction);

      var result = new ReturnDto();
      if (updateTransactionResult == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Despesa alterada com sucesso"
        };

        return Ok(result);
      }
      throw new Exception("Error Update Transaction");
    }
    [HttpDelete("{id}")]
    [Authorize]
    public ActionResult<ReturnDto> Delete([FromRoute] Guid id)
    {
      var deleteTransactionResult = _transactionsService.DeleteTransaction(id);

      var result = new ReturnDto();

      if (deleteTransactionResult == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Despesa deletada com sucesso"
        };

        return Ok(result);
      }
      throw new Exception("Error Delete Transaction");
    }
  }

}

