import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsdemoComponent } from './stepsdemo.component';

describe('StepsdemoComponent', () => {
  let component: StepsdemoComponent;
  let fixture: ComponentFixture<StepsdemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsdemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsdemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
