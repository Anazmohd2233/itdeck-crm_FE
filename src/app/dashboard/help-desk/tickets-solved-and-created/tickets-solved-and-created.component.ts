import { Component } from '@angular/core';
import { TicketsSolvedAndCreatedService } from './tickets-solved-and-created.service';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-tickets-solved-and-created',
    imports: [MatCardModule, MatMenuModule, MatButtonModule],
    templateUrl: './tickets-solved-and-created.component.html',
    styleUrl: './tickets-solved-and-created.component.scss'
})
export class TicketsSolvedAndCreatedComponent {

    constructor(
        private ticketsSolvedAndCreatedService: TicketsSolvedAndCreatedService
    ) {}

    ngOnInit(): void {
        this.ticketsSolvedAndCreatedService.loadChart();
    }

}