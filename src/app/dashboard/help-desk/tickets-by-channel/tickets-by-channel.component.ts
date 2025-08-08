import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { TicketsByChannelService } from './tickets-by-channel.service';

@Component({
    selector: 'app-tickets-by-channel',
    imports: [MatCardModule, MatMenuModule, MatButtonModule],
    templateUrl: './tickets-by-channel.component.html',
    styleUrl: './tickets-by-channel.component.scss'
})
export class TicketsByChannelComponent {

    constructor(
        private ticketsByChannelService: TicketsByChannelService
    ) {}

    ngOnInit(): void {
        this.ticketsByChannelService.loadChart();
    }

}