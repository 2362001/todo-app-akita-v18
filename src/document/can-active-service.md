import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ListRouters, localStorageKey } from '../share/defines';
import { AuthService } from '../share/services/auth.service';
import { checkInitUrl } from '../share/constants/app.constants';

@Injectable()
export class CanActivateService implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return new Promise(async (resolve, reject) => {
            if(checkInitUrl('ip-research/tab-list')){
                resolve(true);
                return;
            }
            let userInfor: any = localStorage.getItem(localStorageKey.USER_INFO);
            if (userInfor) {
                userInfor = JSON.parse(userInfor);
            }
            if (!userInfor) {
                try {
                    userInfor = await this.authService.getUserInfor().toPromise();
                } catch (error) {
                    
                }
                if (userInfor) {
                    localStorage.setItem(localStorageKey.USER_INFO, JSON.stringify(userInfor));
                }
            }
            if (userInfor && !userInfor?.workspaceName && !userInfor?.isAdmin) {
                this.router.navigate([ListRouters.CREATE_WORKSPACE], {
                    queryParams: userInfor,
                });
                resolve(false);
            }
            resolve(true);
        })
    }

}
