import { Component, Injector, OnDestroy, OnInit } from '@angular/core'
import { TYPE_NOTIFICATION } from './utils'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { FormBuilder, NonNullableFormBuilder } from '@angular/forms'
import { Route, Router } from '@angular/router'
import { CommonService } from './services/common.service'
import { LoadingService } from './services/loading.service'

@Component({
    template: '',
    standalone: false
})
export class BaseComponent implements OnInit , OnDestroy{
  commonService : CommonService
  fb: FormBuilder 
  router : Router
  loading: LoadingService
  constructor(private injector : Injector
  ) {
    this.commonService = this.injector.get(CommonService)
    this.fb = this.injector.get(FormBuilder)
    this.router = this.injector.get(Router)
    this.loading = this.injector.get(LoadingService)
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

 
}
