import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})

export class BoardComponent {
  @Input() subject: Subject = {};
    constructor(){}
}

interface Subject {
  name?: string;
}
