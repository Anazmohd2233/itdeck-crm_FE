import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-notifications-page',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, NgIf, MatCheckboxModule, MatTooltipModule],
    templateUrl: './notifications-page.component.html',
    styleUrl: './notifications-page.component.scss'
})
export class NotificationsPageComponent {

    displayedColumns: string[] = ['notificationID', 'timestamp', 'type', 'content', 'status'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        notificationID: '#258',
        timestamp: '01 Dec, 2024 09:30 AM',
        type: 'Information',
        content: 'New software update available. Click here to download.',
        status: {
            read: 'Read',
            // unread: 'Unread',
        }
    },
    {
        notificationID: '#951',
        timestamp: '30 Nov, 2024 09:30 AM',
        type: 'Alert',
        content: 'Urgent: Server maintenance scheduled for tomorrow at 10:00 PM.',
        status: {
            // read: 'Read',
            unread: 'Unread',
        }
    },
    {
        notificationID: '#753',
        timestamp: '28 Nov, 2024 09:30 AM',
        type: 'Announcement',
        content: 'Welcome to our new team member, Jane Smith, as Head of Sales.',
        status: {
            read: 'Read',
            // unread: 'Unread',
        }
    },
    {
        notificationID: '#852',
        timestamp: '27 Nov, 2024 09:30 AM',
        type: 'Information',
        content: 'Check out our latest blog post for tips on improving efficiency.',
        status: {
            read: 'Read',
            // unread: 'Unread',
        }
    },
    {
        notificationID: '#486',
        timestamp: '26 Novc, 2024 09:30 AM',
        type: 'Alert',
        content: 'Attention: Upcoming webinar on cybersecurity best practices.',
        status: {
            // read: 'Read',
            unread: 'Unread',
        }
    },
    {
        notificationID: '#357',
        timestamp: '25 Nov, 2024 09:30 AM',
        type: 'Announcement',
        content: 'Happy Thanksgiving! Our office will be closed on Nov 30.',
        status: {
            read: 'Read',
            // unread: 'Unread',
        }
    },
    {
        notificationID: '#957',
        timestamp: '24 Nov, 2024 09:30 AM',
        type: 'Information',
        content: 'Year-end financial reports are now available for download.',
        status: {
            read: 'Read',
            // unread: 'Unread',
        }
    },
    {
        notificationID: '#153',
        timestamp: '23 Nov, 2024 09:30 AM',
        type: 'Announcement',
        content: 'Critical security update. Update your passwords immediately.',
        status: {
            read: 'Read',
            // unread: 'Unread',
        }
    },
    {
        notificationID: '#257',
        timestamp: '22 Nov, 2024 09:30 AM',
        type: 'Information',
        content: 'Holiday Office Party on Dec 20. Save the date!',
        status: {
            // read: 'Read',
            unread: 'Unread',
        }
    },
    {
        notificationID: '#352',
        timestamp: '20 Nov, 2024 09:30 AM',
        type: 'Alert',
        content: 'Year-end sale: Up to 20% off on selected products.',
        status: {
            read: 'Read',
            // unread: 'Unread',
        }
    }
];

export interface PeriodicElement {
    notificationID: string;
    timestamp: string;
    type: string;
    content: string;
    status: any;
}