import { customerTypesOptions } from '../../enums/customer-types-options';

export interface CustomerOutput {
  id: string;

  name: string;

  type: customerTypesOptions;

  initialBalance: number;

  actualBalance: number;

  isArchived: boolean;
}
