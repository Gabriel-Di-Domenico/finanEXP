import { TransactionType } from './../enums/transactionTypes/transaction-types';
export interface GetAllFilter {
  transactionType?: TransactionType;
  isArchived: boolean;
}
