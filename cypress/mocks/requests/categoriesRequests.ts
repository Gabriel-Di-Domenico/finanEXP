import { TestUtils } from 'cypress/support/test.utils';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { TransactionType } from 'src/app/shared/support/enums/transactionTypes/transaction-types';
import { CategoryOutput } from './../../../src/app/shared/support/interfaces/categories/categoryOutput';
import { CypressBody, CypressRequest } from './cypressRequest';
export class CategoriesRequests {
  private static baseUrl = '/categories';

  public static getCategories() {
    return {
      alias: 'getCategories',
      url: `${this.baseUrl}`,
      method: 'GET',
      response: {
        statusCode: 200,
        body: {
          content: [
            {
              id: TestUtils.mockIds[0],
              name: TestUtils.mockStrings[0],
              transactionType: TransactionType.revenue,
            } as CategoryOutput,
            {
              id: TestUtils.mockIds[1],
              name: TestUtils.mockStrings[1],
              transactionType: TransactionType.expense,
            } as CategoryOutput,
            {
              id: TestUtils.mockIds[2],
              name: TestUtils.mockStrings[2],
              transactionType: TransactionType.expense,
            } as CategoryOutput,
            {
              id: TestUtils.mockIds[3],
              name: TestUtils.mockStrings[3],
              transactionType: TransactionType.expense,
            } as CategoryOutput,
            {
              id: TestUtils.mockIds[4],
              name: TestUtils.mockStrings[4],
              transactionType: TransactionType.expense,
            } as CategoryOutput,
            {
              id: TestUtils.mockIds[5],
              name: TestUtils.mockStrings[5],
              transactionType: TransactionType.expense,
            } as CategoryOutput,
          ],
          message: {
            error: false,
            message: 'Sucesso ao adiquirir lista de carteiras',
          },
        } as ResponseDto<Array<CategoryOutput>>,
      } as CypressBody<ResponseDto<Array<CategoryOutput>>>,
    } as CypressRequest<ResponseDto<Array<CategoryOutput>>>;
  }
}
