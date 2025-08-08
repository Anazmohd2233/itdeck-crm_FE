import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { TotalLeadsService } from './total-leads.service';

@Component({
    selector: 'app-total-leads',
    imports: [MatCardModule, MatMenuModule, MatButtonModule],
    templateUrl: './total-leads.component.html',
    styleUrl: './total-leads.component.scss'
})
export class TotalLeadsComponent {

    constructor(
        private totalLeadsService: TotalLeadsService
    ) {}

    ngOnInit(): void {
        this.totalLeadsService.loadChart();
    }

}