import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { ThemeModule } from "../@theme/theme.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { AuthGuard } from "../services/auth/auth.guard";
import { AuthService } from "../services/auth/auth.service";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NbDialogModule, NbDatepickerModule } from "@nebular/theme";
import { TextMaskModule } from "angular2-text-mask";
import { ModalModule } from 'angular-custom-modal'
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CadastroVeiculosComponent } from './cadastro-veiculos/cadastro-veiculos.component'
import { SpinnerModule } from 'primeng/spinner';

const PAGES_COMPONENTS = [
    PagesComponent,
    CadastroVeiculosComponent
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
        NbDatepickerModule.forRoot()
    ],
    declarations: [
        ...PAGES_COMPONENTS,
    ],
    entryComponents: [
        
    ],
    providers: [AuthGuard, AuthService]
})
export class PagesModule
{
}
