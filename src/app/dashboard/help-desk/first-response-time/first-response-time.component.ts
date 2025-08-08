import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { FirstResponseTimeService } from './first-response-time.service';

@Component({
    selector: 'app-first-response-time',
    imports: [MatCardModule, MatMenuModule, MatButtonModule],
    templateUrl: './first-response-time.component.html',
    styleUrl: './first-response-time.component.scss'
})
export class FirstResponseTimeComponent {

    constructor(
        private firstResponseTimeService: FirstResponseTimeService
    ) {}

    ngOnInit(): void {
        this.firstResponseTimeService.loadChart();
    }

}