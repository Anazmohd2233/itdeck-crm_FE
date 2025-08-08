import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-top-customers',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule],
    templateUrl: './top-customers.component.html',
    styleUrl: './top-customers.component.scss'
})
export class TopCustomersComponent {

    displayedColumns: string[] = ['user', 'viewProfileLink'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        user: {
            img: 'images/users/user6.jpg',
            name: 'Mark Stjohn',
            customerID: 'Customer ID #76431'
        },
        viewProfileLink: '/students'
    },
    {
        user: {
            img: 'images/users/user7.jpg',
            name: 'Joan Stanley',
            customerID: 'Customer ID #64815'
        },
        viewProfileLink: '/students'
    },
    {
        user: {
            img: 'images/users/user8.jpg',
            name: 'Jacob Bell',
            customerID: 'Customer ID #34581'
        },
        viewProfileLink: '/students'
    },
    {
        user: {
            img: 'images/users/user9.jpg',
            name: 'Donald Bryan',
            customerID: 'Customer ID #67941'
        },
        viewProfileLink: '/students'
    },
    {
        user: {
            img: 'images/users/user10.jpg',
            name: 'Kristina Blomquist',
            customerID: 'Customer ID #36985'
        },
        viewProfileLink: '/students'
    },
    {
        user: {
            img: 'images/users/user11.jpg',
            name: 'Jeffrey Morrison',
            customerID: 'Customer ID #26985'
        },
        viewProfileLink: '/students'
    },
    {
        user: {
            img: 'images/users/user1.jpg',
            name: 'Carlos Daley',
            customerID: 'Customer ID #76431'
        },
        viewProfileLink: '/students'
    },
    {
        user: {
            img: 'images/users/user2.jpg',
            name: 'Dorothy Young',
            customerID: 'Customer ID #76431'
        },
        viewProfileLink: '/students'
    },
    {
        user: {
            img: 'images/users/user3.jpg',
            name: 'Greg Woody',
            customerID: 'Customer ID #76431'
        },
        viewProfileLink: '/students'
    },
    {
        user: {
            img: 'images/users/user4.jpg',
            name: 'Deborah  Rosol',
            customerID: 'Customer ID #76431'
        },
        viewProfileLink: '/students'
    },
    {
        user: {
            img: 'images/users/user5.jpg',
            name: 'Kendall Allen',
            customerID: 'Customer ID #76431'
        },
        viewProfileLink: '/students'
    },
    {
        user: {
            img: 'images/users/user12.jpg',
            name: 'Michael Marquez',
            customerID: 'Customer ID #76431'
        },
        viewProfileLink: '/students'
    }
];

export interface PeriodicElement {
    user: any;
    viewProfileLink: string;
}