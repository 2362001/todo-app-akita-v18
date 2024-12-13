import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ListRouters, localStorageKey } from '../share/defines';
import { AuthService } from '../share/services/auth.service';
import Utils from '../share/utils';

@Injectable()
export class CanActivateLoginService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Promise(async (resolve, reject) => {
      const cookieToken = Utils.getCookie(localStorageKey.TOKEN);
      if (cookieToken) {
        // Chọn Stay signed in thì tự động lấy thông tin user
        // & redirect vào trang admin hoặc trang đã truy cập trc đó
        this.authService.getUserInfor().subscribe(res => {
          if (res?.active) {
            localStorage.setItem(localStorageKey.USER_INFO, JSON.stringify(res));
            const currentURl = this.getCurrentUri();
            this.router.navigateByUrl(currentURl || ListRouters.ADMINISTRATOR);
            resolve(true);
          }
        });
        return;
      };
      let uri = this.getCurrentUri()
      if (localStorage.getItem(localStorageKey.TOKEN) && localStorage.getItem(localStorageKey.USER_INFO) && uri) {
        // Đăng nhập không chọn Stay signed in thì redirect vào trang đã truy cập trước đó
        this.router.navigateByUrl(uri);
      }
      resolve(true);
    });
  }
  getCurrentUri() {
    // Redirect về landing page nếu đã đăng nhập thành công
    let previousURl = localStorage.getItem('previousURl')
    let redirect;
    if (previousURl?.startsWith('/' + ListRouters.CREATE_WORKSPACE)) {
      redirect = '/' + ListRouters.LANDING_PAGE
    } 
    console.log("redirect: ", redirect);
    
    return redirect || ListRouters.ADMINISTRATOR;
  }
}
