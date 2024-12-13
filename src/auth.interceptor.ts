import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable, tap } from 'rxjs'
import { LoadingService } from './app/common/services/loading.service'
import { Route, Router } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd/notification'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.isLoading.next(true)
    return next.handle(request).pipe(tap(() => {
      setTimeout(() => {
        this.loadingService.isLoading.next(false);
      }, 100);
    }))
  }
}
