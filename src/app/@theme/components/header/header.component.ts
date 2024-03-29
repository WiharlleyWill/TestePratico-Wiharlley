import { Component, Input, OnInit } from "@angular/core";
import { NbMenuService, NbSidebarService } from "@nebular/theme";
import { AnalyticsService } from "../../../@core/utils/analytics.service";

@Component({
    selector: "ngx-header",
    styleUrls: ["./header.component.scss"],
    templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {

    @Input() position = "normal";

    user: any;
    userMenu = [{ title: "Sair", link: "/login" }];

    constructor(private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private analyticsService: AnalyticsService,

    ) { }

    ngOnInit()
    {
        const email = localStorage.getItem("usuario");
        this.user = { name: email };
    }


    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, "menu-sidebar");

        return false;
    }

    toggleSettings(): boolean {
        this.sidebarService.toggle(false, "settings-sidebar");

        return false;
    }

    goToHome() {
        this.menuService.navigateHome();
    }

    startSearch() {
        this.analyticsService.trackEvent("startSearch");
    }
}
