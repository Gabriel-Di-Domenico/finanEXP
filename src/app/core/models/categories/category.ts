import { TransactionType } from './../../../shared/support/enums/transactionTypes/transaction-types';
import { FullEntity } from 'dist/finan-exp-common';

export abstract class Category extends FullEntity {
  public name!: string;

  public transactionType!: TransactionType;

  public isArchived!: boolean;
}
