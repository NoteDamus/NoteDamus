import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, /*UrlTree,*/ Router } from '@angular/router';
import { Observable } from 'rxjs';
//import { AuthService} from './auth.service'
//import { tap, map, take } from 'rxjs/operators';
import { ToastService } from './toast.service';
//import firebase from 'firebase/app';import 'firebase/auth';
//import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth.service';
//import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor( 
    private router: Router, 
    public toast:ToastService, 
    //private translate: TranslateService,
    private authService:AuthService
    
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {      
      
   /* firebase.auth().onAuthStateChanged( user => {
      if( user){
        resolve(true)
      }else{
        console.log('User is not logged in');
        this.toast.presentToast("You must login", 500)
        this.router.navigate(['/login']);
        reject()
      }
    })*/
  })
    
}

  
  
}
 /* canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.auth.user$.pipe(
           take(1),
           map(user => !!user), // <-- map to boolean
           tap(loggedIn => {
             if (!loggedIn) {
               console.log('access denied')
               this.toast.presentToast("giris yapmaniz gerekmektedir", 500)
               this.router.navigate(['/landing']);
             }
         })
    )
  }
}*/
  /* canActivate():Observable<boolean>{
    //next: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.auth.user$.pipe(
           take(1),
           map(user => !!user), // <-- map to boolean
           tap(loggedIn => {
             if (!loggedIn) {
               console.log('access denied')
               this.toast.presentToast("giris yapmaniz gerekmektedir", 500)
               this.router.navigate(['/landing']);
             }
         })
    )
  }*/
  



/*


@Injectable()
export class AuthGuard implements CanActivate {
  

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

      return this.auth.user$.pipe(
           take(1),
           map(user => !!user), // <-- map to boolean
           tap(loggedIn => {
             if (!loggedIn) {
               console.log('access denied')
               this.router.navigate(['/login']);
             }
         })
    )
  }
}
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService} from './auth.service'
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

      return this.auth.user$.pipe(
           take(1),
           map(user => !!user), // <-- map to boolean
           tap(loggedIn => {
             if (!loggedIn) {
               console.log('access denied')
               this.router.navigate(['/login']);
             }
         })
    )
  }
}

*/