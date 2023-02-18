import { customerTypesOptions } from './../../../shared/support/enums/customer-types-options';
import { FullEntity } from 'dist/finan-exp-common';

export abstract class Customer extends FullEntity {
  public name!: string;

  public type!: customerTypesOptions;

  public initialBalance!: number;

  public actualBalance!: number;

  public transferValue!: number;

  public isArchived!: boolean;
}
