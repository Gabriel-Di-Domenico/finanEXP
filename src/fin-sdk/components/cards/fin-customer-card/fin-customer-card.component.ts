import { CustomerOutput } from 'src/app/shared/support/interfaces/customers/customerOutput.interface';
import { Component, Input } from '@angular/core';
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
