import { FullEntity } from 'dist/finan-exp-common';
import { TransactionType } from './../../../shared/support/enums/transactionTypes/transaction-types';
export abstract class Transaction extends FullEntity {
  public description?: string;

  public value!: number;

  public date!: Date;

  public categoryId?: string;

  public receiverCustomerId!: string;

  public senderCustomerId!: string;

  public type!: TransactionType;
}
