import { Component, OnInit } from "@angular/core";
import { take } from 'rxjs/operators';
import { AdminService } from "../../services/admin.service";


@Component({
    selector: "ngx-dashboard",
    templateUrl: "./dashboard.component.html", styleUrls: [
        './dashboard.css',
    ],
})

export class DashboardComponent
{
    uid;

    constructor(private adminService: AdminService)
    {
        this.uid = localStorage.getItem("uid");

    }

    ngOnInit()
    {
        localStorage.setItem("telaAtual", "Dashboard");
    }



}
