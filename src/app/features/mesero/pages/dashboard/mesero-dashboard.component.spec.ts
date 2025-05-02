import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeseroDashboardComponent } from './mesero-dashboard.component';

describe('MeseroDashboardComponent', () => {
  let component: MeseroDashboardComponent;
  let fixture: ComponentFixture<MeseroDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeseroDashboardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MeseroDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
