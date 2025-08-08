import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-all-projects:not(p)',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, MatTableModule, MatPaginatorModule, NgIf, MatTooltipModule],
    templateUrl: './all-projects.component.html',
    styleUrl: './all-projects.component.scss'
})
export class AllProjectsComponent {

    displayedColumns: string[] = ['id', 'projectName', 'client', 'startDate', 'endDate', 'budget', 'status', 'action'];
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
        id: '#951',
        projectName: 'Hotel management system',
        client: 'Vaxo Corporation',
        startDate: '15 Nov, 2024',
        endDate: '15 Dec, 2024',
        budget: '$5,250',
        status: {
            inProgress: 'In Progress',
            // pending: 'Pending',
            // completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#547',
        projectName: 'Product development',
        client: 'Beja Ltd',
        startDate: '14 Nov, 2024',
        endDate: '14 Dec, 2024',
        budget: '$4,870',
        status: {
            // inProgress: 'In Progress',
            pending: 'Pending',
            // completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#658',
        projectName: 'Python upgrade',
        client: 'Aegis Industries',
        startDate: '13 Nov, 2024',
        endDate: '13 Dec, 2024',
        budget: '$3,500',
        status: {
            // inProgress: 'In Progress',
            // pending: 'Pending',
            completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#367',
        projectName: 'Project monitoring',
        client: 'Affort Solutions',
        startDate: '12 Nov, 2024',
        endDate: '12 Dec, 2024',
        budget: '$7,550',
        status: {
            // inProgress: 'In Progress',
            // pending: 'Pending',
            // completed: 'Completed',
            notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#469',
        projectName: 'Project alpho',
        client: 'Shawn Kennedy',
        startDate: '11 Nov, 2024',
        endDate: '11 Dec, 2024',
        budget: '$2,500',
        status: {
            inProgress: 'In Progress',
            // pending: 'Pending',
            // completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#431',
        projectName: 'Multi-purpose landing',
        client: 'Addax Ltd',
        startDate: '10 Nov, 2024',
        endDate: '10 Dec, 2024',
        budget: '$1,231',
        status: {
            // inProgress: 'In Progress',
            pending: 'Pending',
            // completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#542',
        projectName: 'Services & startup agency',
        client: 'Profun Solutions',
        startDate: '09 Nov, 2024',
        endDate: '09 Dec, 2024',
        budget: '$2,412',
        status: {
            // inProgress: 'In Progress',
            // pending: 'Pending',
            completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#532',
        projectName: 'NFT marketplace',
        client: 'Futo Agency',
        startDate: '08 Nov, 2024',
        endDate: '08 Dec, 2024',
        budget: '$5,412',
        status: {
            // inProgress: 'In Progress',
            // pending: 'Pending',
            // completed: 'Completed',
            notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#567',
        projectName: 'Money transfer',
        client: 'Alina Smith',
        startDate: '07 Nov, 2024',
        endDate: '07 Dec, 2024',
        budget: '$6,421',
        status: {
            inProgress: 'In Progress',
            // pending: 'Pending',
            // completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#341',
        projectName: 'Project launchpad',
        client: 'Mave Metaverse',
        startDate: '06 Nov, 2024',
        endDate: '06 Dec, 2024',
        budget: '$10,242',
        status: {
            // inProgress: 'In Progress',
            // pending: 'Pending',
            completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    }
];

export interface PeriodicElement {
    id: string;
    projectName: string;
    client: string;
    startDate: string;
    endDate: string;
    budget: string;
    status: any;
    action: any;
}