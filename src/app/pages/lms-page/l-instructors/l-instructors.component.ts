import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-l-instructors',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf, MatCheckboxModule, MatTooltipModule],
    templateUrl: './l-instructors.component.html',
    styleUrl: './l-instructors.component.scss'
})
export class LInstructorsComponent {

    displayedColumns: string[] = ['select', 'id', 'instructor', 'totalCourse', 'totalEarnings', 'email', 'ratings', 'status', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this.dataSource.data);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: PeriodicElement): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.instructor + 1}`;
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        id: '#A1217',
        instructor: {
            img: 'images/users/user15.jpg',
            name: 'Marcia Baker'
        },
        totalCourse: 120,
        totalEarnings: '$6855.00',
        email: 'marcia@example.com',
        ratings: '5.00 (141 reviews)',
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: 'delete'
    },
    {
        id: '#A1364',
        instructor: {
            img: 'images/users/user7.jpg',
            name: 'Carolyn Barnes'
        },
        totalCourse: 62,
        totalEarnings: '$258.00',
        email: 'barnes@example.com',
        ratings: '5.00 (69 reviews)',
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: 'delete'
    },
    {
        id: '#A2951',
        instructor: {
            img: 'images/users/user12.jpg',
            name: 'Donna Miller'
        },
        totalCourse: 49,
        totalEarnings: '$3,890.00',
        email: 'donna@example.com',
        ratings: '5.00 (99 reviews)',
        status: {
            // active: 'Active',
            deactive: 'Deactive',
        },
        action: 'delete'
    },
    {
        id: '#A7342',
        instructor: {
            img: 'images/users/user5.jpg',
            name: 'Barbara Cross'
        },
        totalCourse: 25,
        totalEarnings: '$2,500.00',
        email: 'cross@example.com',
        ratings: '4.00 (75 reviews)',
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: 'delete'
    },
    {
        id: '#A4619',
        instructor: {
            img: 'images/users/user16.jpg',
            name: 'Rebecca Block'
        },
        totalCourse: 82,
        totalEarnings: '$8,200.00',
        email: 'block@example.com',
        ratings: '5.00 (158 reviews)',
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: 'delete'
    },
    {
        id: '#A7346',
        instructor: {
            img: 'images/users/user9.jpg',
            name: 'Ramiro McCarty'
        },
        totalCourse: 64,
        totalEarnings: '$640.00',
        email: 'ramiro@example.com',
        ratings: '4.00 (250 reviews)',
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: 'delete'
    },
    {
        id: '#A7612',
        instructor: {
            img: 'images/users/user1.jpg',
            name: 'Robert Fairweather'
        },
        totalCourse: 91,
        totalEarnings: '$9,100.00',
        email: 'robert@example.com',
        ratings: '5.00 (42 reviews)',
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: 'delete'
    },
    {
        id: '#A7642',
        instructor: {
            img: 'images/users/user6.jpg',
            name: 'Marcelino Haddock'
        },
        totalCourse: 73,
        totalEarnings: '$7,300.00',
        email: 'haddock@example.com',
        ratings: '5.00 (248 reviews)',
        status: {
            // active: 'Active',
            deactive: 'Deactive',
        },
        action: 'delete'
    },
    {
        id: '#A4652',
        instructor: {
            img: 'images/users/user13.jpg',
            name: 'Thomas Wilson'
        },
        totalCourse: 66,
        totalEarnings: '$6,600.00',
        email: 'wildon@example.com',
        ratings: '5.00(858 reviews)',
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: 'delete'
    },
    {
        id: '#A7895',
        instructor: {
            img: 'images/users/user14.jpg',
            name: 'Nathaniel Hulsey'
        },
        totalCourse: 28,
        totalEarnings: '$2,800.00',
        email: 'hulsey@example.com',
        ratings: '5.00 (30 reviews)',
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: 'delete'
    },
    {
        id: '#A7895',
        instructor: {
            img: 'images/users/user14.jpg',
            name: 'Nathaniel Hulsey'
        },
        totalCourse: 28,
        totalEarnings: '$2,800.00',
        email: 'hulsey@example.com',
        ratings: '5.00 (30 reviews)',
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: 'delete'
    },
    {
        id: '#A4652',
        instructor: {
            img: 'images/users/user13.jpg',
            name: 'Thomas Wilson'
        },
        totalCourse: 66,
        totalEarnings: '$6,600.00',
        email: 'wildon@example.com',
        ratings: '5.00(858 reviews)',
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: 'delete'
    },
    {
        id: '#A7642',
        instructor: {
            img: 'images/users/user6.jpg',
            name: 'Marcelino Haddock'
        },
        totalCourse: 73,
        totalEarnings: '$7,300.00',
        email: 'haddock@example.com',
        ratings: '5.00(858 reviews)',
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: 'delete'
    },
    {
        id: '#A7612',
        instructor: {
            img: 'images/users/user1.jpg',
            name: 'Robert Fairweather'
        },
        totalCourse: 91,
        totalEarnings: '$9,100.00',
        email: 'robert@example.com',
        ratings: '5.00 (248 reviews)',
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: 'delete'
    },
    {
        id: '#A7346',
        instructor: {
            img: 'images/users/user9.jpg',
            name: 'Ramiro McCarty'
        },
        totalCourse: 64,
        totalEarnings: '$640.00',
        email: 'ramiro@example.com',
        ratings: '5.00 (42 reviews)',
        status: {
            // active: 'Active',
            deactive: 'Deactive',
        },
        action: 'delete'
    },
    {
        id: '#A4619',
        instructor: {
            img: 'images/users/user16.jpg',
            name: 'Rebecca Block'
        },
        totalCourse: 82,
        totalEarnings: '$8,200.00',
        email: 'block@example.com',
        ratings: '4.00 (250 reviews)',
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: 'delete'
    },
    {
        id: '#A7342',
        instructor: {
            img: 'images/users/user5.jpg',
            name: 'Barbara Cross'
        },
        totalCourse: 25,
        totalEarnings: '$2,500.00',
        email: 'cross@example.com',
        ratings: '5.00 (158 reviews)',
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: 'delete'
    },
    {
        id: '#A2951',
        instructor: {
            img: 'images/users/user12.jpg',
            name: 'Donna Miller'
        },
        totalCourse: 49,
        totalEarnings: '$3,890.00',
        email: 'donna@example.com',
        ratings: '4.00 (75 reviews)',
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: 'delete'
    },
    {
        id: '#A1364',
        instructor: {
            img: 'images/users/user7.jpg',
            name: 'Carolyn Barnes'
        },
        totalCourse: 62,
        totalEarnings: '$258.00',
        email: 'barnes@example.com',
        ratings: '5.00 (99 reviews)',
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: 'delete'
    },
    {
        id: '#A1217',
        instructor: {
            img: 'images/users/user15.jpg',
            name: 'Marcia Baker'
        },
        totalCourse: 120,
        totalEarnings: '$6855.00',
        email: 'marcia@example.com',
        ratings: '5.00 (69 reviews)',
        status: {
            // active: 'Active',
            deactive: 'Deactive',
        },
        action: 'delete'
    }
];

export interface PeriodicElement {
    id: string;
    instructor: any;
    totalCourse: number;
    totalEarnings: string;
    email: string;
    ratings: string;
    status: any;
    action: string;
}