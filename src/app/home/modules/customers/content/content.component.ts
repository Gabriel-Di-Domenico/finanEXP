import { Component, Input, LOCALE_ID, OnInit } from '@angular/core';
import CustomerOutput from 'src/app/shared/support/interfaces/customers/customerOutput.interface';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr);

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class ContentComponent implements OnInit {
  @Input() public customers!: Array<CustomerOutput>;
  public totalBalance = 0;

  ngOnInit(): void {
    this.getTotalBalance();
  }
  private getTotalBalance(){
    this.customers.forEach((customer : CustomerOutput) => {
      this.totalBalance += customer.balance;
    });
  }
}
