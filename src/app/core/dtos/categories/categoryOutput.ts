import { TransactionType } from '../../../shared/support/enums/transactionTypes/transaction-types';
export class CategoryOutput {
  public id!:string;
  public name!:string;
  public transactionType!:TransactionType;
}