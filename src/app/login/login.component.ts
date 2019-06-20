import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "../services/admin.service";
import { AuthenticationService, TokenPayload } from '../services/auth/authentication.service'

@Component({
    selector: "ngx-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent
{
    mensagem = "";
    rememberMe: true;
    usuario: string;
    password: string;

    constructor(private router: Router, private adminService: AdminService, private auth: AuthenticationService)
    {
        localStorage.removeItem("usuario");
        localStorage.removeItem("uid");
        localStorage.setItem("telaAtual", "Login");
    }

    login()
    {
        if (this.validar())
        {
            var credentials: TokenPayload = {
                login: this.usuario,
                senha: this.password
            }

            this.auth.login(credentials).subscribe(dados =>
            {   
                if (this.rememberMe)
                {
                    localStorage.setItem("rememberMe", 'true');
                    localStorage.setItem("usuario", this.usuario);
                } else
                {
                    localStorage.setItem("usuario", this.usuario);
                    localStorage.setItem("rememberMe", 'false');
                }
                localStorage.setItem("cpf", dados.cpf);
                this.router.navigate(["/pages/dashboard"]);
            },
                err =>
                {
                    this.mensagem = "Usuário não encontrado";
                    console.error(err)
                });

            /*this.auth.login(credentials).subscribe(
                () =>
                {
                    console.log("Login realizado com sucesso!");
                    if (this.rememberMe)
                    {
                        localStorage.setItem("rememberMe", 'true');
                        localStorage.setItem("usuario", this.usuario);
                    } else
                    {
                        localStorage.setItem("usuario", this.usuario);
                        localStorage.setItem("rememberMe", 'false');
                    }
                    this.router.navigate(["/pages/dashboard"]);
                },
                err =>
                {
                    this.mensagem = "Usuário não encontrado";
                    console.error(err)
                }
            );*/
        }


    }
    validar()
    {
        if (this.usuario && this.password)
        {
            return true;
        }
        else
        {
            this.mensagem = "Informe usuario e senha";
            return false;
        }
    }
}
