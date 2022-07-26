import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';


import { AppComponent } from './app.component';
import { MenuComponent } from './components/view/menu/menu.component';
import { AuthenticateModule } from './authenticate/authenticate.module';


describe('AppComponent', () => {
  let fixture: ComponentFixture<MenuComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        AuthenticateModule,
        
      ],
      declarations: [
        AppComponent,
        MenuComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(MenuComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
