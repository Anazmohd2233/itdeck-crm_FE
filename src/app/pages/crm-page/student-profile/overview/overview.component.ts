import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { OverviewService } from './overview.service';

@Component({
    selector: 'app-overview',
    imports: [MatCardModule, MatMenuModule, MatButtonModule],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.scss'
})
export class OverviewComponent {

    constructor(
        private overviewService: OverviewService
    ) {}

    ngOnInit(): void {
        this.overviewService.loadChart();
    }

}