import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaststepComponent } from './laststep.component';

describe('LaststepComponent', () => {
  let component: LaststepComponent;
  let fixture: ComponentFixture<LaststepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaststepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaststepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
