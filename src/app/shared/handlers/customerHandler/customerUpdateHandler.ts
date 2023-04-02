import { EventEmitter } from '@angular/core';
import { CustomerOutput } from 'src/app/core/dtos/customers/customerOutput';

export const customerUpdateHandler = new EventEmitter<Array<CustomerOutput>>();
