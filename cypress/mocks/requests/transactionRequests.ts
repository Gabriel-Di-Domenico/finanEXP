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
            } as TransactionOutput
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
            } as TransactionOutput
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
              senderCustomerId:TestUtils.mockIds[0],
              description: TestUtils.mockStrings[0],
              transactionType: TransactionType.transfer,
              value: TestUtils.mockNumbers[0],
            } as TransactionOutput,
            {
              id: TestUtils.mockIds[1],
              categoryId: TestUtils.mockIds[1],
              receiverCustomerId: TestUtils.mockIds[1],
              senderCustomerId:TestUtils.mockIds[1],
              description: TestUtils.mockStrings[1],
              transactionType: TransactionType.transfer,
              value: TestUtils.mockNumbers[1],
            } as TransactionOutput
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
