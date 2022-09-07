import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let compiled: HTMLElement
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent,],
      imports: [
        MatListModule,
        MatIconModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Have a add button', () => {
    const addButton = compiled.querySelector('#addButton')
    expect(addButton).toBeTruthy()
  })

  it('Have a dashboard link', () => {
    const dashboardLink = compiled.querySelector('#dashboardLink')
    expect(dashboardLink).toBeTruthy()

  })

  it('Have a wallets button', () => {
    const walletsButton = compiled.querySelector('#walletsButton')
    expect(walletsButton).toBeTruthy()
  })
  it('Have a authenticate link', () => {
    const userConfig = compiled.querySelector('#userConfig')
    expect(userConfig).toBeTruthy()

  })

});
