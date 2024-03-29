import { TransactionInput } from './../../../src/app/shared/support/interfaces/transactions/transactionInput';
import { TestUtils } from 'cypress/support/test.utils';
import { TransactionOutput } from './../../../src/app/shared/support/interfaces/transactions/transactionOutput';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { CypressBody, CypressRequest } from './cypressRequest';
import { TransactionType } from 'src/app/shared/support/enums/transactionTypes/transaction-types';

export class TransactionRequests {
  private static baseUrl = '/transactions';

  public static getTransactions() {
    return {
      alias: 'getTransactions',
      url: `${this.baseUrl}`,
      method: 'GET',
      response: {
        statusCode: 200,
        body: {
          content: [
            {
              id: TestUtils.mockIds[0],
              categoryId: TestUtils.mockIds[0],
              receiverCustomerId: TestUtils.mockIds[0],
              description: TestUtils.mockStrings[0],
              transactionType: TransactionType.expense,
              value: TestUtils.mockNumbers[0],
            } as TransactionOutput,
            {
              id: TestUtils.mockIds[1],
              categoryId: TestUtils.mockIds[1],
              receiverCustomerId: TestUtils.mockIds[1],
              description: TestUtils.mockStrings[1],
              transactionType: TransactionType.expense,
              value: TestUtils.mockNumbers[1],
            } as TransactionOutput,
            {
              id: TestUtils.mockIds[2],
              categoryId: TestUtils.mockIds[2],
              receiverCustomerId: TestUtils.mockIds[2],
              description: TestUtils.mockStrings[2],
              transactionType: TransactionType.revenue,
              value: TestUtils.mockNumbers[2],
            } as TransactionOutput,
            {
              id: TestUtils.mockIds[3],
              categoryId: TestUtils.mockIds[3],
              receiverCustomerId: TestUtils.mockIds[3],
              description: TestUtils.mockStrings[3],
              transactionType: TransactionType.revenue,
              value: TestUtils.mockNumbers[3],
            } as TransactionOutput,
            {
              id: TestUtils.mockIds[4],
              categoryId: TestUtils.mockIds[4],
              receiverCustomerId: TestUtils.mockIds[4],
              description: TestUtils.mockStrings[4],
              transactionType: TransactionType.transfer,
              value: TestUtils.mockNumbers[4],
            } as TransactionOutput,
            {
              id: TestUtils.mockIds[5],
              categoryId: TestUtils.mockIds[5],
              receiverCustomerId: TestUtils.mockIds[5],
              description: TestUtils.mockStrings[5],
              transactionType: TransactionType.transfer,
              value: TestUtils.mockNumbers[5],
            } as TransactionOutput,
          ],
          message: {
            error: false,
            message: 'Sucesso ao adiquirir lista de transações',
          },
        } as ResponseDto<Array<TransactionOutput>>,
      } as CypressBody<ResponseDto<Array<TransactionOutput>>>,
    } as CypressRequest<ResponseDto<Array<TransactionOutput>>>;
  }
  public static getTransactionById() {
    return {
      alias: 'getTransactionById',
      url: `${this.baseUrl}/**`,
      method: 'GET',
      response: {
        statusCode: 200,
        body: {
          content: {
            id: TestUtils.mockIds[0],
            categoryId: TestUtils.mockIds[0],
            receiverCustomerId: TestUtils.mockIds[0],
            description: TestUtils.mockStrings[0],
            transactionType: TransactionType.expense,
            value: TestUtils.mockNumbers[0],
            date: new Date(2023, 0, 3),
          } as TransactionOutput,
          message: {
            error: false,
            message: 'Sucesso ao adiquirir transação',
          },
        } as ResponseDto<TransactionOutput>,
      } as CypressBody<ResponseDto<TransactionOutput>>,
    } as CypressRequest<ResponseDto<TransactionOutput>>;
  }
  public static putTransaction() {
    return {
      alias: 'putTransaction',
      url: `${this.baseUrl}/**`,
      method: 'PUT',
      response: {
        statusCode: 200,
        body: {
          content: null,
          message: {
            error: false,
            message: 'Despesa alterada com sucesso',
          },
        } as ResponseDto,
      } as CypressBody<ResponseDto>,
      expectedBody: {
        categoryId: TestUtils.mockIds[1],
        receiverCustomerId: TestUtils.mockIds[1],
        description: TestUtils.mockStrings[1],
        transactionType: TransactionType.expense,
        value: 15,
        date: '2022-05-05T03:00:00.000Z',
      },
    } as CypressRequest<ResponseDto>;
  }
  public static deleteTransaction() {
    return {
      alias: 'deleteTransaction',
      url: `${this.baseUrl}/**`,
      method: 'DELETE',
      response: {
        statusCode: 200,
        body: {
          content: null,
          message: {
            error: false,
            message: 'Despesa deletada com sucesso',
          },
        } as ResponseDto,
      } as CypressBody<ResponseDto>,
    } as CypressRequest<ResponseDto>;
  }
  public static postTransaction() {
    return {
      alias: 'postTransaction',
      url: `${this.baseUrl}`,
      method: 'POST',
      response: {
        statusCode: 200,
        body: {
          content: null,
          message: {
            error: false,
            message: 'Transação criada com sucesso',
          },
        } as ResponseDto,
      } as CypressBody<ResponseDto>,
      expectedBody: {
        categoryId: TestUtils.mockIds[0],
        receiverCustomerId: TestUtils.mockIds[0],
        description: TestUtils.mockStrings[0],
        transactionType: TransactionType.expense,
        value: 15,
        date: '2022-05-05T03:00:00.000Z',
      } as TransactionInput,
    } as CypressRequest<ResponseDto, TransactionInput>;
  }
  // TODO remover getRevenues, getTransfers e getExpenses depois que tiver sorting
  public static getRevenues() {
    return {
      alias: 'getRevenues',
      url: `${this.baseUrl}?**`,
      method: 'GET',
      response: {
        statusCode: 200,
        body: {
          content: [
            {
              id: TestUtils.mockIds[0],
              categoryId: TestUtils.mockIds[0],
              receiverCustomerId: TestUtils.mockIds[0],
              description: TestUtils.mockStrings[0],
              transactionType: TransactionType.revenue,
              value: TestUtils.mockNumbers[0],
            } as TransactionOutput,
            {
              id: TestUtils.mockIds[1],
              categoryId: TestUtils.mockIds[1],
              receiverCustomerId: TestUtils.mockIds[1],
              description: TestUtils.mockStrings[1],
              transactionType: TransactionType.revenue,
              value: TestUtils.mockNumbers[1],
            } as TransactionOutput,
          ],
          message: {
            error: false,
            message: 'Sucesso ao adiquirir lista de transações',
          },
        } as ResponseDto<Array<TransactionOutput>>,
      } as CypressBody<ResponseDto<Array<TransactionOutput>>>,
    } as CypressRequest<ResponseDto<Array<TransactionOutput>>>;
  }
  public static getExpenses() {
    return {
      alias: 'getExpenses',
      url: `${this.baseUrl}?**`,
      method: 'GET',
      response: {
        statusCode: 200,
        body: {
          content: [
            {
              id: TestUtils.mockIds[0],
              categoryId: TestUtils.mockIds[0],
              receiverCustomerId: TestUtils.mockIds[0],
              description: TestUtils.mockStrings[0],
              transactionType: TransactionType.expense,
              value: TestUtils.mockNumbers[0],
            } as TransactionOutput,
            {
              id: TestUtils.mockIds[1],
              categoryId: TestUtils.mockIds[1],
              receiverCustomerId: TestUtils.mockIds[1],
              description: TestUtils.mockStrings[1],
              transactionType: TransactionType.expense,
              value: TestUtils.mockNumbers[1],
            } as TransactionOutput,
          ],
          message: {
            error: false,
            message: 'Sucesso ao adiquirir lista de transações',
          },
        } as ResponseDto<Array<TransactionOutput>>,
      } as CypressBody<ResponseDto<Array<TransactionOutput>>>,
    } as CypressRequest<ResponseDto<Array<TransactionOutput>>>;
  }
  public static getTransfers() {
    return {
      alias: 'getTransfers',
      url: `${this.baseUrl}?**`,
      method: 'GET',
      response: {
        statusCode: 200,
        body: {
          content: [
            {
              id: TestUtils.mockIds[0],
              categoryId: TestUtils.mockIds[0],
              receiverCustomerId: TestUtils.mockIds[0],
              senderCustomerId: TestUtils.mockIds[0],
              description: TestUtils.mockStrings[0],
              transactionType: TransactionType.transfer,
              value: TestUtils.mockNumbers[0],
            } as TransactionOutput,
            {
              id: TestUtils.mockIds[1],
              categoryId: TestUtils.mockIds[1],
              receiverCustomerId: TestUtils.mockIds[1],
              senderCustomerId: TestUtils.mockIds[1],
              description: TestUtils.mockStrings[1],
              transactionType: TransactionType.transfer,
              value: TestUtils.mockNumbers[1],
            } as TransactionOutput,
          ],
          message: {
            error: false,
            message: 'Sucesso ao adiquirir lista de transações',
          },
        } as ResponseDto<Array<TransactionOutput>>,
      } as CypressBody<ResponseDto<Array<TransactionOutput>>>,
    } as CypressRequest<ResponseDto<Array<TransactionOutput>>>;
  }
}
