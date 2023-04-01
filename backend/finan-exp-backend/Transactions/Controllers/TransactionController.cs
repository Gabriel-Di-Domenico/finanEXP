using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Classes;
using Shared.Enums;
using Shared.Dtos;
using Authenticate.Services;
using Customers.Services;
using Transactions.Dtos;
using Transactions.Services;
using Shared.Messages;
using Transactions.Models;

namespace Transactions.Controllers
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
    public async Task<ActionResult<ReturnDto>> Create([FromBody] TransactionInput input)
    {
      var result = new ReturnDto();

      var createTransactionResult = await _transactionsService.CreateTransaction(input);

      if (createTransactionResult == ResponseStatus.Ok)
      {
        ResponseStatus calculateSenderCustomerBalanceResult = ResponseStatus.BadRequest;
        var transaction = _mapper.Map<Transaction>(input);
        if (input.TransactionType == TransactionType.Transfer)
        {
          await _customerBalanceService.CalculateTransferValue(true, transaction);
          calculateSenderCustomerBalanceResult = await _customerBalanceService.CalculateCustomerBalance((Guid)transaction.SenderCustomerId);
        }
        else
        {
          calculateSenderCustomerBalanceResult = ResponseStatus.Ok;
        }
        var calculateCustomerBalanceResult = await _customerBalanceService.CalculateCustomerBalance(transaction.ReceiverCustomerId);

        if (calculateCustomerBalanceResult == ResponseStatus.Ok && calculateSenderCustomerBalanceResult == ResponseStatus.Ok)
        {
          string transactionTypeReturnMessage = "";
          switch (input.TransactionType)
          {
            case TransactionType.Transfer:
              transactionTypeReturnMessage = "Transferência";
              break;
            case TransactionType.Revenue:
              transactionTypeReturnMessage = "Receita";
              break;
            case TransactionType.Expense:
              transactionTypeReturnMessage = "Despesa";
              break;
          }
          result.Message = new Message
          {
            error = false,
            message = $"{transactionTypeReturnMessage} criada com sucesso"
          };

          return Created("", result);
        }
        throw new Exception("Error Calculate Customer balance from create transaction");
      }
      throw new Exception("Error create transaction");

    }
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<ReturnDto>> GetAll([FromQuery] GetAllFilter filter)
    {
      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));

      var getAllTransactionsResponse = await _transactionsService.GetAllTransactions(filter);
      var result = new ReturnDto<List<TransactionOutput>>();

      if (getAllTransactionsResponse.Status == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Sucesso ao adiquirir lista de transações"
        };
        var transactionsModel = new List<TransactionOutput>();
        getAllTransactionsResponse.Content.ForEach(transaction =>
        {
          transactionsModel.Add(_mapper.Map<TransactionOutput>(transaction));
        });
         
        result.Content = transactionsModel;

        return Ok(result);
      }
      throw new Exception("Error GetAll Categories");
    }
    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<ReturnDto>> GetById([FromRoute] Guid Id)
    {
      var getTransactionByIdResult = await _transactionsService.GetTransactionById(Id);

      var result = new ReturnDto<TransactionOutput>();

      if (getTransactionByIdResult.Status == ResponseStatus.Ok)
      {
        var customerModel = _mapper.Map<TransactionOutput>(getTransactionByIdResult.Content);

        result.Message = new Message
        {
          error = false,
          message = "Sucesso ao adquirir transação"
        };

        result.Content = customerModel;

        return Ok(result);
      }
      throw new Exception("Error Get Transaction By Id");
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<ReturnDto>> Update(
      [FromRoute] Guid id,
      [FromBody] TransactionInput newTransaction)
    {
      var updateTransactionResult = await _transactionsService.UpdateTransaction(id, newTransaction);

      var result = new ReturnDto();

      if (updateTransactionResult.Status == ResponseStatus.Ok)
      {
        var Bearertoken = Request.Headers["Authorization"];
        Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));
        ResponseStatus calculateSenderCustomerBalanceResult = ResponseStatus.BadRequest;

        var transactionModel = _mapper.Map<Transaction>(updateTransactionResult.Content);

        if (transactionModel.TransactionType == TransactionType.Transfer)
        {
          await _customerBalanceService.CalculateTransferValue(true, transactionModel);
          calculateSenderCustomerBalanceResult = await _customerBalanceService.CalculateCustomerBalance((Guid)transactionModel.SenderCustomerId);
        }
        else
        {
          calculateSenderCustomerBalanceResult = ResponseStatus.Ok;
        }
        var calculateCustomerBalanceResult = await _customerBalanceService.CalculateCustomerBalance(transactionModel.ReceiverCustomerId);

        if (calculateCustomerBalanceResult == ResponseStatus.Ok && calculateSenderCustomerBalanceResult == ResponseStatus.Ok)
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
    public async Task<ActionResult<ReturnDto>> Delete([FromRoute] Guid id)
    {
      var deleteTransactionResult = await _transactionsService.DeleteTransaction(id);

      var result = new ReturnDto();

      if (deleteTransactionResult.Status == ResponseStatus.Ok)
      {
        var Bearertoken = Request.Headers["Authorization"];
        Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));
        ResponseStatus calculateSenderCustomerBalanceResult = ResponseStatus.BadRequest;

        var transactionModel = _mapper.Map<Transaction>(deleteTransactionResult.Content);

        if (transactionModel.TransactionType == TransactionType.Transfer)
        {
          await _customerBalanceService.CalculateTransferValue(true, transactionModel);
          calculateSenderCustomerBalanceResult = await _customerBalanceService.CalculateCustomerBalance((Guid)transactionModel.SenderCustomerId);
        }
        else
        {
          calculateSenderCustomerBalanceResult = ResponseStatus.Ok;
        }
        var calculateCustomerBalanceResult = await _customerBalanceService.CalculateCustomerBalance(transactionModel.ReceiverCustomerId);

        if (calculateCustomerBalanceResult == ResponseStatus.Ok && calculateSenderCustomerBalanceResult == ResponseStatus.Ok)
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

