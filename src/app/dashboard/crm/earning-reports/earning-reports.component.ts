import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { EarningReportsService } from "./earning-reports.service";

@Component({
    selector: 'app-earning-reports',
    imports: [MatCardModule, MatMenuModule, MatButtonModule],
    templateUrl: './earning-reports.component.html',
    styleUrl: './earning-reports.component.scss'
})
export class EarningReportsComponent {

    constructor(
        private earningReportsService: EarningReportsService
    ) {}

    ngOnInit(): void {
        this.earningReportsService.loadChart();
    }

}