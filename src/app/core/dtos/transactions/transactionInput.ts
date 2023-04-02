import { TransactionType } from 'src/app/shared/support/enums/transactionTypes/transaction-types';

export class TransactionInput {
  public description?: string;
  public value!: number;
  public categoryId?: string | null;
  public receiverCustomerId!: string;
  public senderCustomerId?: string;
  public transactionType!: TransactionType;
  public date!: Date | string;
}
