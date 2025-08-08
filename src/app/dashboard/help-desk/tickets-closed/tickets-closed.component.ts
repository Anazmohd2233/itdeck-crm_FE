import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { TicketsClosedService } from './tickets-closed.service';

@Component({
    selector: 'app-tickets-closed',
    imports: [MatCardModule],
    templateUrl: './tickets-closed.component.html',
    styleUrl: './tickets-closed.component.scss'
})
export class TicketsClosedComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private ticketsClosedService: TicketsClosedService
    ) {}

    ngOnInit(): void {
        this.ticketsClosedService.loadChart();
    }

}