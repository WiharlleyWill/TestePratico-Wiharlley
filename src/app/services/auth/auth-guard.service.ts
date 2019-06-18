import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { AuthenticationService } from './authentication.service'

@Injectable()
export class AuthGuardService implements CanActivate
{
    constructor(private authService: AuthenticationService, private router: Router) { }
    cont = 0;

    canActivate()
    {
        if (!this.authService.isLoggedIn())
        {
            this.router.navigateByUrl('/login');
            return false
        } else
            if (this.cont == 0 && localStorage.getItem("telaAtual") != "Login")
            {
                return this.manterConectado();
            } else
            {
                this.cont++;
                return true;
            }
    }

    manterConectado()
    {
        if (localStorage.getItem("rememberMe") === "true")
        {
            return true;
        } else
        {
            this.authService.logout();
            return false;
        }
    }
}
