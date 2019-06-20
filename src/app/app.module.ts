import { APP_BASE_HREF } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "./@core/core.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ThemeModule } from "./@theme/theme.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoginComponent } from "./login/login.component";
import { NbInputModule, NbCheckboxModule, NbWindowModule, NbDialogModule, NbDatepickerModule } from "@nebular/theme";
import { AdminService } from "./services/admin.service";
import { TextMaskModule } from "angular2-text-mask";
import { ExcelService } from "./services/excel.service";
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { HttpModule } from '@angular/http';
import { SpinnerModule } from 'primeng/spinner';
import { CalendarModule } from 'primeng/calendar';
import { AuthGuardService } from "./services/auth/auth-guard.service";
import { ToastrModule } from 'ng6-toastr-notifications';

@NgModule({
    declarations: [AppComponent, LoginComponent],
    imports: [
        NbInputModule,
        NbCheckboxModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NbWindowModule.forRoot(),
        NbDialogModule.forRoot(),
        NgbModule.forRoot(),
        ThemeModule.forRoot(),
        CoreModule.forRoot(),
        TextMaskModule,
        ReactiveFormsModule,
        CurrencyMaskModule,
        HttpModule,
        SpinnerModule,
        NbDatepickerModule.forRoot(),
        CalendarModule,
        ToastrModule.forRoot()
    ],
    bootstrap: [AppComponent],
    providers: [
        AuthGuardService,
        AdminService,
        ExcelService,
        { provide: APP_BASE_HREF, useValue: "/" },
    ],
})
export class AppModule
{
}
