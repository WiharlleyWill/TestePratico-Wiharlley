import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { AuthService } from "./auth.service";
import { ICanDeactivate } from "./ican-deactivate";

@Injectable()
export class AuthGuard implements CanActivate
{
    uid;
    cont = 0;

    constructor(private authService: AuthService)
    {
        this.uid = localStorage.getItem("uid");
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {

        if (this.authService.isAuthenticated() && this.tipoLogin())
        {   
            if(this.cont == 0 && localStorage.getItem("telaAtual") != "Login"){
                return this.manterConectado();
            }else{
                this.cont++;
                return true;
            }
        }

        this.authService.signout();
        return false;
    }

    canDeactivate(component: ICanDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        return component.canDeactivate ? component.canDeactivate() : true;
    }

    tipoLogin(){
        if(localStorage.getItem("tipoLogin") === "Admin"){
            return true;
        }else{
            this.authService.signout();
            return false;
        }
    }

    manterConectado(){
        if(localStorage.getItem("rememberMe") === "true"){
            return true;
        }else{
            this.authService.signout();
            return false;
        }
    }
}
