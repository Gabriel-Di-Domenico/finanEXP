import { customerTypesOptions } from './../../../shared/support/enums/customer-types-options';
export class CustomerInput {
  public name!: string;

  public type!: customerTypesOptions;

  public initialBalance!: number;

  public actualBalance?: number;

  public isArchived?: boolean;
}
