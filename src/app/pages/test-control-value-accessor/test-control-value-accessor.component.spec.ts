import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestControlValueAccessorComponent } from './test-control-value-accessor.component';

describe('TestControlValueAccessorComponent', () => {
  let component: TestControlValueAccessorComponent;
  let fixture: ComponentFixture<TestControlValueAccessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestControlValueAccessorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestControlValueAccessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
