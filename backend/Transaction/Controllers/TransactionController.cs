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
using backend.Customers.Services;
using backend.Authenticate.Services;

namespace backend.Transactions.Controllers
{
  [Route("/Transactions")]
  [ApiController]
  public class TransactionController : ControllerBase
  {
    private readonly ITransactionService _transactionsService;
    private readonly IMapper _mapper;
    private readonly ICustomerBalanceService _customerBalanceService;

    public TransactionController(ITransactionService transactionsService, IMapper mapper,
      ICustomerBalanceService customerBalanceService)
    {
      _transactionsService = transactionsService;
      _mapper = mapper;
      _customerBalanceService = customerBalanceService;
    }

    [HttpPost]
    [Authorize]
    public ActionResult<ReturnDto> Create([FromBody] TransactionCreateDto transaction)
    {         
      var transactionModel = _mapper.Map<Transaction>(transaction);

      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));
      transactionModel.UserId = userId;

      var result = new ReturnDto();

      var createTransactionResult = _transactionsService.CreateTransaction(transactionModel);

      if (createTransactionResult == ResponseStatus.Ok)
      {
        
        var calculateCustomerBalanceResult = _customerBalanceService.CalculateCustomerBalance(transaction.CustomerId, userId);

        if(calculateCustomerBalanceResult == ResponseStatus.Ok)
        {
          result.Message = new Message
          {
            error = false,
            message = $"{transaction.TransactionType} criada com sucesso"
          };

          return Created("", result);
        }
        throw new Exception("Error Calculate Customer balance from create transaction");
      }
      throw new Exception("Error create transaction");

    }
    [HttpGet]
    [Authorize]
    public ActionResult<ReturnDto> GetAll([FromQuery] GetAllFilter filter)
    {
      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));

      var getAllTransactionsResponse = _transactionsService.GetAllTransactions(userId, filter);
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
        var Bearertoken = Request.Headers["Authorization"];
        Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));
        var calculateCustomerBalanceResult = _customerBalanceService.CalculateCustomerBalance(newTransaction.CustomerId, userId);

        if (calculateCustomerBalanceResult == ResponseStatus.Ok)
        {
          result.Message = new Message
          {
            error = false,
            message = "Despesa alterada com sucesso"
          };

          return Ok(result);
        }
        throw new Exception("Error calculate customer balance from delete transaction");
      }
      throw new Exception("Error Update Transaction");
    }
    [HttpDelete("{id}")]
    [Authorize]
    public ActionResult<ReturnDto> Delete([FromRoute] Guid id)
    {
      var deleteTransactionResult = _transactionsService.DeleteTransaction(id);

      var result = new ReturnDto();

      if (deleteTransactionResult.Status == ResponseStatus.Ok)
      {
        var Bearertoken = Request.Headers["Authorization"];
        Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));
        var calculateCustomerBalanceResult = _customerBalanceService.CalculateCustomerBalance(deleteTransactionResult.Content.CustomerId, userId);

        if (calculateCustomerBalanceResult == ResponseStatus.Ok)
        {
          result.Message = new Message
          {
            error = false,
            message = "Despesa deletada com sucesso"
          };

          return Ok(result);
        }
        throw new Exception("Error calculate customer balance from delete transaction");
       
      }
      throw new Exception("Error Delete Transaction");
    }
  }

}

