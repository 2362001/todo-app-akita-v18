import { Component, Input } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { CommonModule } from '@angular/common';
import { log } from 'console';

@Component({
    selector: 'app-loading',
    imports: [CommonModule],
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
