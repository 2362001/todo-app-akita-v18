import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError, filter } from 'rxjs/operators';
import { ListRouters, TypeToast, localStorageKey } from '../share/defines';
import Utils from '../share/utils';
import { NavigationEnd, ResolveEnd, Router } from '@angular/router';
import { CommonService } from '../share/services/common.service';
import { LoadingService } from '../share/services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  module: any;
  constructor(
    private loadingService: LoadingService,
    private router: Router,
    private toastService: CommonService
  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd || event instanceof ResolveEnd)).subscribe((router: any) => {
      let module = router.url.split('/');
      module = module.filter(i => i);
      this.module = module[0];
    });
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const paramsLoading: any = request.params.get('isLoading');
    if (paramsLoading) {
      this.loadingService.isLoading.next(true);
    }

    let accessToken = localStorage.getItem(localStorageKey.TOKEN);
    const cookieToken = Utils.getCookie(localStorageKey.TOKEN);
    if (cookieToken) {
      accessToken = cookieToken;
    }

    let customReq = request;
    if (accessToken && !request.url.includes('assets')) {
      customReq = request.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
      });
    }
    return next.handle(customReq).pipe(
      tap(() => {
        if (paramsLoading) {
          setTimeout(() => {
            this.loadingService.isLoading.next(false);
          }, 100);
        }
      }),
      catchError((err: HttpErrorResponse) => {
        this.errorHandler(err, paramsLoading)
        throw err;
      })
    );
  }

  errorHandler(err, paramsLoading) {
    if (paramsLoading) {
      this.loadingService.isLoading.next(false);
    }
    if (err?.status == 401) {
      localStorage.clear()
      Utils.clearCookie();
      this.router.navigateByUrl(ListRouters.LOGIN);
    }
    if (err.status == 421) {
      this.toastService.openToast(
        TypeToast.ERROR,
        'System',
        'An error occurred during reseting password'
      );
    }
    if (err.status == 422) {
      this.router.navigate(['manager-account'], {
        queryParams: {
          ev: 1,
        },
      });
    }
    if (err.status == 400) {
      this.toastService.openToast(
        TypeToast.ERROR,
        'System',
        err?.error?.errors?.body
      );
    }
    if (err?.status == 500) {
      this.toastService.openToast(
        TypeToast.ERROR,
        'System',
        'System error please try again later!'
      );
    }
    if (err?.status == 403) {
      let url = '403'
      switch (this.module) {
        case 'administrator':
          url = this.module + '/' + url;
          this.router.navigateByUrl(url).then(() => {
            window.location.reload();
          });
          break;
        case 'payment/plan-management':
          url = this.module + '/list/' + url;
          this.router.navigateByUrl(url).then(() => {
            window.location.reload();
          });
          break;
        default:
          this.router.navigateByUrl(url).then(() => {
            window.location.reload();
          });
          break;
      }
    }
  }
}
