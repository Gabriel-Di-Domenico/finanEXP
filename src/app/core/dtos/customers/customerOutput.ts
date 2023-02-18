import { customerTypesOptions } from 'src/app/shared/support/enums/customer-types-options';

export class CustomerOutput {
  public id!: string;
  public name!: string;

  public type!: customerTypesOptions;

  public initialBalance!: number;

  public actualBalance!: number;

  public isArchived!: boolean;
}
