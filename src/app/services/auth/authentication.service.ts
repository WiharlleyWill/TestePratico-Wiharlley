import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

export interface FuncionarioDetalhes {
    id: number
    first_name: string
    last_name: string
    email: string
    password: string
    exp: number
    iat: number
}

interface TokenResponse {
    token: string
}

export interface TokenPayload {
    login: string
    senha: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private token: string

    constructor(private http: HttpClient, private router: Router) { }

    private saveToken(token: string): void {
        localStorage.setItem('usertoken', token)
        this.token = token
    }

    public getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('usertoken')
        }
        return this.token
    }

    public getUserDetails(): FuncionarioDetalhes {
        const token = this.getToken()
        let payload
        if (token) {
            payload = token.split('.')[1]
            payload = window.atob(payload)
            return JSON.parse(payload)
        } else {
            return null
        }
    }

    public isLoggedIn(): boolean {
        /*const user = this.getUserDetails();
        console.log("Is Loged in Exp");
        console.log(user.exp > Date.now() / 1000);
        console.log("Date Now");
        console.log(Date.now() / 1000);
        console.log(user);
        if (user) {
            return user.exp > Date.now() / 1000
        } else {
            return false
        }*/
        //Controle de tempo limite conectado
        return true;
    }

    public login(funcionario: TokenPayload): Observable<any> {
        const base = this.http.post(`/funcionarios/login`, funcionario);

        const request = base.pipe(
            map((data: TokenResponse) => {
                if (data.token)
                {
                    this.saveToken(data.token);
                }
                return data
            })
        )

        return request
    }

    public logout(): void {
        this.token = ''
        window.localStorage.removeItem('usertoken')
        this.router.navigateByUrl('/login')
        localStorage.setItem("rememberMe", 'false');
    }
}
