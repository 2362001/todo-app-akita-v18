import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { authRoute } from '../common/route'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userCredentials = localStorage.getItem('user_credentials')

    if (typeof window !== 'undefined' && localStorage) {
      if (userCredentials) {
        return true
      }
    }

    this.router.navigate([authRoute.LOGIN])

    return false
  }
}
