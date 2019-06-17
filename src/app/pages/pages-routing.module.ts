import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CadastroVeiculosComponent } from './cadastro-veiculos/cadastro-veiculos.component'
import { CadastroFuncionarioComponent } from './cadastro-funcionario/cadastro-funcionario.component';
import { AuthGuardService } from "../services/auth/auth-guard.service";


const routes: Routes = [{
    path: "",
    component: PagesComponent,
    children: [
        //Home
        {
            path: "dashboard",
            component: DashboardComponent,
            canActivate: [AuthGuardService],
        },
        {
            path: "cadastro-veiculo",
            component: CadastroVeiculosComponent,
           // canActivate: [AuthGuard],
        },
        {
            path: "novo-funcionario",
            component: CadastroFuncionarioComponent,
           // canActivate: [AuthGuard],
        },
        {
            path: "",
            redirectTo: "dashboard",
            pathMatch: "full",
        },
        
    ],
},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {
}
