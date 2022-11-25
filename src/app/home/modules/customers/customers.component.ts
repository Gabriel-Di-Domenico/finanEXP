import { CustomerEditorDialogDataInterface } from 'src/app/shared/support/interfaces/customers/customerEditorDialogData.interface';
import { CustomersService } from './customers.service';
import { CustomerEdtiorDialogComponent } from './customer-edtior-dialog/customer-edtior-dialog.component';
import { DialogControlService } from './../../../shared/support/services/dialogControl/dialog-control.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerOutput } from 'src/app/shared/support/interfaces/customers/customerOutput.interface';
import { take } from 'rxjs/operators';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { Subscription } from 'rxjs';
import { GetAllFilter } from 'src/app/shared/support/interfaces/getAllFilter';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  public customers!: Array<CustomerOutput>;
  public subscriptions: Array<Subscription> = [];
  public isArchivedComponent = false;
  constructor(
    private dialogControl: DialogControlService,
    private route: ActivatedRoute,
    private customersService: CustomersService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe({
      next: (data: any) => {
        this.isArchivedComponent = data['isArchivedComponent'];
      },
    });
    this.getCustomers();
  }
  public openCustomerComponent() {
    this.router.navigate(['home', 'customers'])
  }
  public openCustomerEditorDialog(): void {
    this.dialogControl
      .openDialog(CustomerEdtiorDialogComponent, {
        width: '650px',
        height: '500px',
        data: {
          operation: 'create',
        } as CustomerEditorDialogDataInterface,
      })
      .afterClosed()
      .subscribe({
        next: () => {
          const filter = {
            isArchived: false,
          } as GetAllFilter;
          this.customersService.getAll(filter, (data: ResponseDto<Array<CustomerOutput>>) => {
            this.customers = <Array<CustomerOutput>>data.content;
          });
        },
      });
  }

  private getCustomers() {
    this.route.data.pipe(take(1)).subscribe({
      next: (data: any) => {
        this.customers = data['customers'];
      },
    });

  }
}
