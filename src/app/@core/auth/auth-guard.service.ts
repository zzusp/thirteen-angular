import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from '../../routes/user/user.model';
import { LoginService } from '../../routes/pages/login/login.service';
import { getUserInfo } from '../util/user-info';

/**
 * 路由守卫，访问权限认证
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private loginService: LoginService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkActive(state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }

  checkActive(url: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const currentUser: UserModel = getUserInfo();
      let canActive = false;
      if (currentUser !== null && currentUser.apps != null) {
        if (url === '/views') {
          canActive = true;
        } else {
          for (const application of currentUser.apps) {
            if (application.url === url) {
              canActive = true;
              break;
            }
          }
        }
      }
      if (!canActive) {
        this.router.navigate(['/pages/404']);
      }
      resolve(canActive);
    });
  }

}
