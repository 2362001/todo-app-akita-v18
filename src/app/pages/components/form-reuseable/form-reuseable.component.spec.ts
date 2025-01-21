import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReuseableComponent } from './form-reuseable.component';

describe('FormReuseableComponent', () => {
  let component: FormReuseableComponent;
  let fixture: ComponentFixture<FormReuseableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormReuseableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormReuseableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
