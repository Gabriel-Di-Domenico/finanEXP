import { TransactionType } from './../../enums/transactionTypes/transaction-types';
export interface TransactionOutput {
  id: string;
  description: string;
  date: Date;
  value: number;
  categoryId: string;
  receiverCustomerId: string;
  senderCustomerId?:string;
  transactionType: TransactionType;
}
