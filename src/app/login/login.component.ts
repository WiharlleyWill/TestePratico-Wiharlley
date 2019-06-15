import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "../services/admin.service";

@Component({
    selector: "ngx-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent
{
    mensagem = "";
    rememberMe: true;
    email: string;
    password: string;
    constructor(private router: Router, private adminService: AdminService)
    {
        localStorage.removeItem("email");
        localStorage.removeItem("uid");
        localStorage.setItem("telaAtual", "Login");
    }
    login()
    {
        this.router.navigate(["/pages/dashboard"]);
    }
    validar()
    {
        if (this.email && this.password)
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
