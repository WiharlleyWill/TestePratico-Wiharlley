import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuardService } from "../services/auth/auth-guard.service";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CadastroVeiculosComponent } from './cadastro-veiculos/cadastro-veiculos.component'
import { CadastroFuncionarioComponent } from './cadastro-funcionario/cadastro-funcionario.component';
import { ConsultarFuncionarioComponent } from './consultar-funcionario/consultar-funcionario.component';
import { ConsultarVeiculoComponent } from './consultar-veiculo/consultar-veiculo.component';
import { RelatorioVeiculosAtivadosComponent } from './relatorio-veiculos-ativados/relatorio-veiculos-ativados.component';
import { RelatorioAniversariantesComponent } from './relatorio-aniversariantes/relatorio-aniversariantes.component';


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
            canActivate: [AuthGuardService],
        },
        {
            path: "cadastrar-funcionario",
            component: CadastroFuncionarioComponent,
            canActivate: [AuthGuardService],
        },
        {
            path: "consultar-funcionario",
            component: ConsultarFuncionarioComponent,
            canActivate: [AuthGuardService],
        },
        {
            path: "consultar-veiculo",
            component: ConsultarVeiculoComponent,
            canActivate: [AuthGuardService],
        },
        {
            path: "relatorio-veiculos-ativados",
            component: RelatorioVeiculosAtivadosComponent,
            canActivate: [AuthGuardService],
        },
        {
            path: "relatorio-aniversariantes",
            component: RelatorioAniversariantesComponent,
            canActivate: [AuthGuardService],
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
