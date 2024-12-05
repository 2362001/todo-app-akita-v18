import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsExerciseComponent } from './results-exercise.component';

describe('ResultsExerciseComponent', () => {
  let component: ResultsExerciseComponent;
  let fixture: ComponentFixture<ResultsExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsExerciseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
