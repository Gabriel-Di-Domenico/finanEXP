import { customerTypesOptions } from '../../enums/customer-types-options';

export interface CustomerInput {
  name: string;

  type: customerTypesOptions;

  initialBalance:number;

  isArchived:boolean
}
