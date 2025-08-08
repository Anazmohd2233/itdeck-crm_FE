import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-sla-monitoring',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule],
    templateUrl: './sla-monitoring.component.html',
    styleUrl: './sla-monitoring.component.scss'
})
export class SlaMonitoringComponent {

    displayedColumns: string[] = ['ticketID', 'subject', 'requester', 'slaDueBy', 'timeRemaining'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        ticketID: '#258',
        subject: 'Issues with Email Access',
        requester: 'example@daxa.com',
        slaDueBy: 'Dec 10, 2024 12:00 PM',
        timeRemaining: '1 days 4 hours'
    },
    {
        ticketID: '#957',
        subject: 'Software Installation',
        requester: 'example@neja.com',
        slaDueBy: 'Nov 30, 2024 2:00 PM',
        timeRemaining: '1 day'
    },
    {
        ticketID: '#432',
        subject: 'Application Access Issue',
        requester: 'example@vaxo.com',
        slaDueBy: 'Dec 15, 2024 9:30 AM',
        timeRemaining: '5 days 7 hours'
    },
    {
        ticketID: '#234',
        subject: 'Network Connectivity',
        requester: 'example@aoriv.com',
        slaDueBy: 'Dec 30, 2024 10:30 AM',
        timeRemaining: '15 days 2 hours'
    },
    {
        ticketID: '#258',
        subject: 'Issues with Email Access',
        requester: 'example@daxa.com',
        slaDueBy: 'Dec 10, 2024 12:00 PM',
        timeRemaining: '1 days 4 hours'
    },
    {
        ticketID: '#957',
        subject: 'Software Installation',
        requester: 'example@neja.com',
        slaDueBy: 'Nov 30, 2024 2:00 PM',
        timeRemaining: '1 day'
    },
    {
        ticketID: '#432',
        subject: 'Application Access Issue',
        requester: 'example@vaxo.com',
        slaDueBy: 'Dec 15, 2024 9:30 AM',
        timeRemaining: '5 days 7 hours'
    },
    {
        ticketID: '#234',
        subject: 'Network Connectivity',
        requester: 'example@aoriv.com',
        slaDueBy: 'Dec 30, 2024 10:30 AM',
        timeRemaining: '15 days 2 hours'
    },
    {
        ticketID: '#258',
        subject: 'Issues with Email Access',
        requester: 'example@daxa.com',
        slaDueBy: 'Dec 10, 2024 12:00 PM',
        timeRemaining: '1 days 4 hours'
    },
    {
        ticketID: '#957',
        subject: 'Software Installation',
        requester: 'example@neja.com',
        slaDueBy: 'Nov 30, 2024 2:00 PM',
        timeRemaining: '1 day'
    },
    {
        ticketID: '#432',
        subject: 'Application Access Issue',
        requester: 'example@vaxo.com',
        slaDueBy: 'Dec 15, 2024 9:30 AM',
        timeRemaining: '5 days 7 hours'
    },
    {
        ticketID: '#234',
        subject: 'Network Connectivity',
        requester: 'example@aoriv.com',
        slaDueBy: 'Dec 30, 2024 10:30 AM',
        timeRemaining: '15 days 2 hours'
    }
];

export interface PeriodicElement {
    ticketID: string;
    subject: string;
    requester: string;
    slaDueBy: string;
    timeRemaining: string;
}