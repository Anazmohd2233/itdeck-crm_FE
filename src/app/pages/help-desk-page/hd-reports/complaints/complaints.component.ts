import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ComplaintsService } from './complaints.service';

@Component({
    selector: 'app-complaints',
    imports: [MatCardModule, MatMenuModule, MatButtonModule],
    templateUrl: './complaints.component.html',
    styleUrl: './complaints.component.scss'
})
export class ComplaintsComponent {

    constructor(
        private complaintsService: ComplaintsService
    ) {}

    ngOnInit(): void {
        this.complaintsService.loadChart();
    }

}