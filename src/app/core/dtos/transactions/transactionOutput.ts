import { TransactionType } from 'src/app/shared/support/enums/transactionTypes/transaction-types';

export class TransactionOutput {
  public id!: string;
  public description!: string;
  public date!: Date;
  public value!: number;
  public categoryId?: string;
  public receiverCustomerId!: string;
  public senderCustomerId?: string;
  public transactionType!: TransactionType;
}
