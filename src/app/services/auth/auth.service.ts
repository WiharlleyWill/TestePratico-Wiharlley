import { Injectable, Optional, Inject, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject, BehaviorSubject, Observable } from "rxjs";

import * as moment from "moment";

@Injectable()
export class AuthService
{
    private authenticatedSource: Subject<boolean> = new BehaviorSubject<boolean>(
        AuthService.isAuthenticated()
    );
    public authenticated$ = this.authenticatedSource.asObservable();

    constructor(private injector: Injector, private router: Router)
    {
    }


    private static isAuthenticated(): boolean
    {
        return !!localStorage.getItem("email") && !!localStorage.getItem("uid");
    }

    private static getExpiration(): moment.Moment
    {
        const expiration = localStorage.getItem("expiresAt");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    protected setToken(token: { accessToken: string; expiresInSeconds: number; userName: string; changePasswordNextLogin: string, role: string, comitenteId: string }): void
    {
        const expiresAt = moment().add(token.expiresInSeconds, "second");
        localStorage.setItem("token", token.accessToken);
        localStorage.setItem("changepassword", token.changePasswordNextLogin);
        localStorage.setItem("userName", token.userName);
        localStorage.setItem("role", token.role);
        localStorage.setItem("comitenteId", token.comitenteId);
        localStorage.setItem("expiresAt", JSON.stringify(expiresAt.valueOf()));
        if (!token.changePasswordNextLogin)
        {
            this.authenticatedSource.next(this.isAuthenticated());
        }
    }

    public clearToken(): void
    {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("changepassword");
        localStorage.removeItem("expiresAt");
        localStorage.removeItem("role");
        this.authenticatedSource.next(this.isAuthenticated());
    }

    public isAuthenticated(): boolean
    {
        return AuthService.isAuthenticated();
    }


    redirectToHome()
    {
        this.router.navigate(["/pages/dashboard"]);
    }

    private setSession(data: any): any
    {
        this.setToken(data);
        return data;
    }

    public signout(): void
    {
        this.clearToken();
        this.router.navigate(["/login"]);
    }

    public checkAuthenticated(): void
    {
        if (!this.isAuthenticated())
        {
            this.router.navigate(["/login"]);
        }
    }

    public denied()
    {

    }
}
