import { Component } from '@angular/core';
import { allListSubject } from '../../common/mock-data';
import { CommonModule } from '@angular/common';
import { BoardComponent } from "./board/board.component";

@Component({
    selector: 'app-exercise',
    imports: [CommonModule, BoardComponent],
    templateUrl: './exercise.component.html',
    styleUrl: './exercise.component.scss'
})
export class ExerciseComponent {
  allListSubject : any;
  constructor(){
    this.allListSubject = allListSubject
  }
}
