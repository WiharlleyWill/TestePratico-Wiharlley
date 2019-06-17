import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "../services/admin.service";
import { AuthenticationService, TokenPayload } from '../services/auth/authentication.service'

@Component({
    selector: "ngx-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
    mensagem = "";
    rememberMe: true;
    usuario: string;
    password: string;

    

    constructor(private router: Router, private adminService: AdminService, private auth: AuthenticationService) {
        localStorage.removeItem("usuario");
        localStorage.removeItem("uid");
        localStorage.setItem("telaAtual", "Login");
    }

    login() {
        //this.router.navigate(["/pages/dashboard"]);
        if (this.validar()) {
            var credentials: TokenPayload = {
                id: 0,
                first_name: '',
                last_name: '',
                email: this.usuario,
                password: this.password
            }
            console.log(credentials);
            this.auth.login(credentials).subscribe(
                () => {
                    console.log("Verdadeiro");
                    this.router.navigate(["/pages/dashboard"]);
                },
                err => {
                    console.error(err)
                }
            );
        }


    }
    validar() {
        if (this.usuario && this.password) {
            return true;
        }
        else {
            this.mensagem = "Informe usuario e senha";
            return false;
        }
    }
}
