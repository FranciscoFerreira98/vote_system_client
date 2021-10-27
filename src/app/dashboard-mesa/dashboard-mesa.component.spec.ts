import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMesaComponent } from './dashboard-mesa.component';

describe('DashboardMesaComponent', () => {
  let component: DashboardMesaComponent;
  let fixture: ComponentFixture<DashboardMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
