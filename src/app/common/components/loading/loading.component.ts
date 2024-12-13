import { Component, Input } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
    @Input() scope! : string 
    @Input() isloading! : boolean
    @Input() speed! : number
    constructor(private loadingService : LoadingService ){
      this.loadingService.isLoading.subscribe(res => {
        this.isloading = res
      })
    }
}
