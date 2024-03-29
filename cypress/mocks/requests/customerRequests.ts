import { CustomerInput } from 'src/app/shared/support/interfaces/customers/customerInput.interface';
import { customerTypesOptions } from './../../../src/app/shared/support/enums/customer-types-options';
import { TestUtils } from 'cypress/support/test.utils';
import { CustomerOutput } from './../../../src/app/shared/support/interfaces/customers/customerOutput.interface';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { CypressBody, CypressRequest } from './cypressRequest';

export class CustomerRequests {
  private static baseUrl = '/customers';

  public static getCustomerById() {
    return {
      alias: 'getCustomerById',
      url: `${this.baseUrl}/**`,
      method: 'GET',
      response: {
        statusCode: 200,
        body: {
          content: {
            id: TestUtils.mockIds[0],
            actualBalance: TestUtils.mockNumbers[0],
            initialBalance: TestUtils.mockNumbers[0],
            isArchived: false,
            name: TestUtils.mockStrings[0],
            type: customerTypesOptions.Bank,
          } as CustomerOutput,
          message: {
            error: false,
            message: 'Sucesso ao adquirir carteira',
          },
        } as ResponseDto<CustomerOutput>,
      } as CypressBody<ResponseDto<CustomerOutput>>,
    } as CypressRequest<ResponseDto<CustomerOutput>>;
  }
  public static getCustomers() {
    return {
      alias: 'getCustomers',
      url: `${this.baseUrl}`,
      method: 'GET',
      response: {
        statusCode: 200,
        body: {
          content: [
            {
              id: TestUtils.mockIds[0],
              actualBalance: TestUtils.mockNumbers[0],
              initialBalance: TestUtils.mockNumbers[0],
              isArchived: false,
              name: TestUtils.mockStrings[0],
              type: customerTypesOptions.Bank,
            } as CustomerOutput,
            {
              id: TestUtils.mockIds[1],
              actualBalance: TestUtils.mockNumbers[1],
              initialBalance: TestUtils.mockNumbers[1],
              isArchived: false,
              name: TestUtils.mockStrings[1],
              type: customerTypesOptions.Investment,
            } as CustomerOutput,
            {
              id: TestUtils.mockIds[2],
              actualBalance: TestUtils.mockNumbers[2],
              initialBalance: TestUtils.mockNumbers[2],
              isArchived: false,
              name: TestUtils.mockStrings[2],
              type: customerTypesOptions.Money,
            } as CustomerOutput,
            {
              id: TestUtils.mockIds[3],
              actualBalance: TestUtils.mockNumbers[3],
              initialBalance: TestUtils.mockNumbers[3],
              isArchived: false,
              name: TestUtils.mockStrings[3],
              type: customerTypesOptions.Others,
            } as CustomerOutput,
            {
              id: TestUtils.mockIds[4],
              actualBalance: TestUtils.mockNumbers[4],
              initialBalance: TestUtils.mockNumbers[4],
              isArchived: true,
              name: TestUtils.mockStrings[4],
              type: customerTypesOptions.Savings,
            } as CustomerOutput,
            {
              id: TestUtils.mockIds[5],
              actualBalance: TestUtils.mockNumbers[5],
              initialBalance: TestUtils.mockNumbers[5],
              isArchived: true,
              name: TestUtils.mockStrings[5],
              type: customerTypesOptions.Bank,
            } as CustomerOutput,
          ],
          message: {
            error: false,
            message: 'Sucesso ao adiquirir lista de carteiras',
          },
        } as ResponseDto<Array<CustomerOutput>>,
      } as CypressBody<ResponseDto<Array<CustomerOutput>>>,
    } as CypressRequest<ResponseDto<Array<CustomerOutput>>>;
  }
  // TODO remover depois que o sorting for feito
  public static getCustomersV2() {
    return {
      alias: 'getCustomers',
      url: `${this.baseUrl}?**`,
      method: 'GET',
      response: {
        statusCode: 200,
        body: {
          content: [
            {
              id: TestUtils.mockIds[0],
              actualBalance: TestUtils.mockNumbers[0],
              initialBalance: TestUtils.mockNumbers[0],
              isArchived: false,
              name: TestUtils.mockStrings[0],
              type: customerTypesOptions.Bank,
            } as CustomerOutput,
            {
              id: TestUtils.mockIds[1],
              actualBalance: TestUtils.mockNumbers[1],
              initialBalance: TestUtils.mockNumbers[1],
              isArchived: false,
              name: TestUtils.mockStrings[1],
              type: customerTypesOptions.Investment,
            } as CustomerOutput,
            {
              id: TestUtils.mockIds[2],
              actualBalance: TestUtils.mockNumbers[2],
              initialBalance: TestUtils.mockNumbers[2],
              isArchived: false,
              name: TestUtils.mockStrings[2],
              type: customerTypesOptions.Money,
            } as CustomerOutput,
            {
              id: TestUtils.mockIds[3],
              actualBalance: TestUtils.mockNumbers[3],
              initialBalance: TestUtils.mockNumbers[3],
              isArchived: false,
              name: TestUtils.mockStrings[3],
              type: customerTypesOptions.Others,
            } as CustomerOutput,
            {
              id: TestUtils.mockIds[4],
              actualBalance: TestUtils.mockNumbers[4],
              initialBalance: TestUtils.mockNumbers[4],
              isArchived: true,
              name: TestUtils.mockStrings[4],
              type: customerTypesOptions.Savings,
            } as CustomerOutput,
            {
              id: TestUtils.mockIds[5],
              actualBalance: TestUtils.mockNumbers[5],
              initialBalance: TestUtils.mockNumbers[5],
              isArchived: true,
              name: TestUtils.mockStrings[5],
              type: customerTypesOptions.Bank,
            } as CustomerOutput,
          ],
          message: {
            error: false,
            message: 'Sucesso ao adiquirir lista de carteiras',
          },
        } as ResponseDto<Array<CustomerOutput>>,
      } as CypressBody<ResponseDto<Array<CustomerOutput>>>,
    } as CypressRequest<ResponseDto<Array<CustomerOutput>>>;
  }
  public static postCustomer() {
    return {
      alias: 'postCustomer',
      url: `${this.baseUrl}`,
      method: 'POST',
      response: {
        statusCode: 200,
        body: {
          content: null,
          message: {
            error: false,
            message: 'Sucesso ao adicionar carteira',
          },
        } as ResponseDto,
      } as CypressBody<ResponseDto>,
      expectedBody: {
        initialBalance: TestUtils.mockNumbers[0],
        name: TestUtils.mockStrings[0],
        type: customerTypesOptions.Bank,
      } as CustomerInput,
    } as CypressRequest<ResponseDto, CustomerInput>;
  }
  public static putCustomer() {
    return {
      alias: 'putCustomer',
      url: `${this.baseUrl}/**`,
      method: 'PUT',
      response: {
        statusCode: 200,
        body: {
          content: null,
          message: {
            error: false,
            message: 'Sucesso ao atualizar carteira',
          },
        } as ResponseDto,
      } as CypressBody<ResponseDto>,
      expectedBody: {
        initialBalance: TestUtils.mockNumbers[0],
        name: TestUtils.mockStrings[0],
        type: customerTypesOptions.Bank,
      } as CustomerInput,
    } as CypressRequest<ResponseDto, CustomerInput>;
  }
  public static deleteCustomer() {
    return {
      alias: 'deleteCustomer',
      url: `${this.baseUrl}/**`,
      method: 'DELETE',
      response: {
        statusCode: 200,
        body: {
          content: null,
          message: {
            error: false,
            message: 'Sucesso ao deletar carteira',
          },
        } as ResponseDto,
      } as CypressBody<ResponseDto>,
    } as CypressRequest<ResponseDto>;
  }
}
