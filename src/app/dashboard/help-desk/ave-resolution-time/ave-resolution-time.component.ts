import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AveResolutionTimeService } from './ave-resolution-time.service';

@Component({
    selector: 'app-ave-resolution-time',
    imports: [MatCardModule, MatMenuModule, MatButtonModule],
    templateUrl: './ave-resolution-time.component.html',
    styleUrl: './ave-resolution-time.component.scss'
})
export class AveResolutionTimeComponent {

    constructor(
        private aveResolutionTimeService: AveResolutionTimeService
    ) {}

    ngOnInit(): void {
        this.aveResolutionTimeService.loadChart();
    }

}