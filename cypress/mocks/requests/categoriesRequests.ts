import { CategoryInput } from './../../../src/app/shared/support/interfaces/categories/categoryInput';
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
  // TODO remover depois que o sorting for feito
  public static getCategoriesV2() {
    return {
      alias: 'getCategoriesV2',
      url: `${this.baseUrl}?**`,
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
  public static getCategoryById() {
    return {
      alias: 'getCategoryById',
      url: `${this.baseUrl}/**`,
      method: 'GET',
      response: {
        statusCode: 200,
        body: {
          content:
            {
              id: TestUtils.mockIds[0],
              name: TestUtils.mockStrings[0],
              transactionType: TransactionType.revenue,
            } as CategoryOutput,
          message: {
            error: false,
            message: 'Sucesso ao adiquirir categoria',
          },
        } as ResponseDto<CategoryOutput>,
      } as CypressBody<ResponseDto<CategoryOutput>>,
    } as CypressRequest<ResponseDto<CategoryOutput>>;
  }
  public static putCategory() {
    return {
      alias: 'putCategory',
      url: `${this.baseUrl}/**`,
      method: 'PUT',
      response: {
        statusCode: 200,
        body: {
          content:null,
          message: {
            error: false,
            message: 'Sucesso ao editar categoria',
          },
        } as ResponseDto,
      } as CypressBody<ResponseDto>,
      expectedBody: {
        name:TestUtils.mockStrings[1],
        transactionType: TransactionType.revenue
      }
    } as CypressRequest<ResponseDto, CategoryInput>;
  }
  public static postCategory() {
    return {
      alias: 'postCategory',
      url: `${this.baseUrl}`,
      method: 'POST',
      response: {
        statusCode: 200,
        body: {
          content:null,
          message: {
            error: false,
            message: 'Sucesso ao criar categoria',
          },
        } as ResponseDto,
      } as CypressBody<ResponseDto>,
      expectedBody: {
        name:TestUtils.mockStrings[0],
        transactionType: TransactionType.revenue
      }
    } as CypressRequest<ResponseDto, CategoryInput>;
  }
  public static deleteCategory() {
    return {
      alias: 'deleteCategory',
      url: `${this.baseUrl}/**`,
      method: 'DELETE',
      response: {
        statusCode: 200,
        body: {
          content:null,
          message: {
            error: false,
            message: 'Sucesso ao deletar categoria',
          },
        } as ResponseDto,
      } as CypressBody<ResponseDto>
    } as CypressRequest<ResponseDto>;
  }
}
