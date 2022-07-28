import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

import { AuthenticateComponent } from './authenticate.component';
import { AuthenticateFormComponent } from './authenticate-form/authenticate-form.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('authenticateComponent', () => {
  let component: AuthenticateComponent;
  let fixture: ComponentFixture<AuthenticateComponent>;
  let compiled: HTMLElement
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AuthenticateComponent,
        AuthenticateFormComponent
      ],
      imports: [
        BrowserAnimationsModule,

        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatIconModule,
        
        RouterTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthenticateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Have a authenticate IMG', () => {
    const authenticateIMG = compiled.querySelector('#authenticateIMG')
    expect(authenticateIMG).toBeTruthy()
  })
  it('Have a authenticateForm', () => {
    const authenticateForm = compiled.querySelector('#authenticateForm')
    expect(authenticateForm).toBeTruthy()
  })
});
