import { Component, Input } from '@angular/core';
import { CustomerOutput } from 'src/app/core/dtos/customers/customerOutput';
import { customerTypesOptionsPortuguese } from 'src/app/shared/support/enums/customer-types-options-portuguese';

@Component({
  selector: 'fin-customer-card',
  templateUrl: './fin-customer-card.component.html',
  styleUrls: ['./fin-customer-card.component.css']
})
export class FinCustomerCardComponent {
  @Input() customer!:CustomerOutput;
  public customerTypesOptionsPortuguese = customerTypesOptionsPortuguese;

}
