import { TransactionType } from '../../../shared/support/enums/transactionTypes/transaction-types';
export class CategoryInput {
  public name!: string;
  public transactionType!:TransactionType;
  public isArchived!:boolean;
}
