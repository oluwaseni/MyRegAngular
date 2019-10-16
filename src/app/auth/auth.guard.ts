import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {



  /**
   *
   */
  constructor(private router:Router, private service: UserService) {
    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): 
  // Observable<boolean> | Promise<boolean> | can also return these types
  boolean{

    if(localStorage.getItem('token') != null)
    {
      let roles = next.data['permittedRoles'] as Array<string>;
      if(roles){
        if(this.service.roleMatch(roles))return true;
        else
        {
          this.router.navigate(['/home/forbiden']);
          return false;
        }
      }
    return true;
    
    }
    else 
    {
    this.router.navigate(['user/login']);
    return false
    }
  }
  
}
