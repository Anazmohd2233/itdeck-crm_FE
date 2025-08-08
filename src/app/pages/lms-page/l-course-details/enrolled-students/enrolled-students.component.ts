import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-enrolled-students',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, MatTableModule, MatProgressBarModule],
    templateUrl: './enrolled-students.component.html',
    styleUrl: './enrolled-students.component.scss'
})
export class EnrolledStudentsComponent {

    displayedColumns: string[] = ['userID', 'student', 'email'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        userID: '#ARP-158',
        student: {
            img: 'images/users/user15.jpg',
            name: 'Walter Frazier'
        },
        email: 'walter@example.com'
    },
    {
        userID: '#ARP-132',
        student: {
            img: 'images/users/user7.jpg',
            name: 'Kimberly Anderson'
        },
        email: 'kimberly@example.com'
    },
    {
        userID: '#ARP-142',
        student: {
            img: 'images/users/user5.jpg',
            name: 'Roscoe Guerrero'
        },
        email: 'roscoe@example.com'
    },
    {
        userID: '#ARP-125',
        student: {
            img: 'images/users/user12.jpg',
            name: 'Robert Stewart'
        },
        email: 'robert@example.com'
    },
    {
        userID: '#ARP-176',
        student: {
            img: 'images/users/user15.jpg',
            name: 'Walter Frazier'
        },
        email: 'walter@example.com'
    },
    {
        userID: '#ARP-199',
        student: {
            img: 'images/users/user7.jpg',
            name: 'Kimberly Anderson'
        },
        email: 'kimberly@example.com'
    },
    {
        userID: '#ARP-162',
        student: {
            img: 'images/users/user5.jpg',
            name: 'Roscoe Guerrero'
        },
        email: 'roscoe@example.com'
    },
    {
        userID: '#ARP-187',
        student: {
            img: 'images/users/user12.jpg',
            name: 'Robert Stewart'
        },
        email: 'robert@example.com'
    }
];
export interface PeriodicElement {
    userID: string;
    student: any;
    email: string;
}