import { EventEmitter } from '@angular/core';
import { CustomerOutput } from '../../support/interfaces/customers/customerOutput.interface';

export const customerUpdateHandler = new EventEmitter<Array<CustomerOutput>>();
