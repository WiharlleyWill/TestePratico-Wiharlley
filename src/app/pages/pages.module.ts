import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { ThemeModule } from "../@theme/theme.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NbDialogModule, NbDatepickerModule } from "@nebular/theme";
import { TextMaskModule } from "angular2-text-mask";
import { ModalModule } from 'angular-custom-modal'
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { SpinnerModule } from 'primeng/spinner';
import { CadastroVeiculosComponent } from './cadastro-veiculos/cadastro-veiculos.component'
import { CadastroFuncionarioComponent } from './cadastro-funcionario/cadastro-funcionario.component';
import { CalendarModule } from 'primeng/calendar';
import { ConsultarFuncionarioComponent } from './consultar-funcionario/consultar-funcionario.component';
import { ConsultarVeiculoComponent } from './consultar-veiculo/consultar-veiculo.component';
import { RelatorioVeiculosAtivadosComponent } from './relatorio-veiculos-ativados/relatorio-veiculos-ativados.component';
import { RelatorioAniversariantesComponent } from './relatorio-aniversariantes/relatorio-aniversariantes.component';

import { AuthenticationService } from "../services/auth/authentication.service";
import { AuthGuardService } from "../services/auth/auth-guard.service";


const PAGES_COMPONENTS = [
    PagesComponent,
    CadastroVeiculosComponent,
    CadastroFuncionarioComponent,
    ConsultarFuncionarioComponent,
    ConsultarVeiculoComponent,
    RelatorioVeiculosAtivadosComponent,
    RelatorioAniversariantesComponent
];

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        DashboardModule,
        MiscellaneousModule,
        Ng2SmartTableModule,
        NbDialogModule.forChild(),
        TextMaskModule,
        ModalModule,
        AngularFontAwesomeModule,
        CurrencyMaskModule,
        SpinnerModule,
        NbDatepickerModule.forRoot(),
        CalendarModule
    ],
    declarations: [
        ...PAGES_COMPONENTS,
    ],
    entryComponents: [

    ],
    providers: [AuthGuardService, AuthenticationService]
})
export class PagesModule
{
}
