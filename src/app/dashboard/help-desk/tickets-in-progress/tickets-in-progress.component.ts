import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { TicketsInProgressService } from './tickets-in-progress.service';

@Component({
    selector: 'app-tickets-in-progress',
    imports: [MatCardModule],
    templateUrl: './tickets-in-progress.component.html',
    styleUrl: './tickets-in-progress.component.scss'
})
export class TicketsInProgressComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private ticketsInProgressService: TicketsInProgressService
    ) {}

    ngOnInit(): void {
        this.ticketsInProgressService.loadChart();
    }

}