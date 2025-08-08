import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-performance-of-agents',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatProgressBarModule, MatTooltipModule],
    templateUrl: './performance-of-agents.component.html',
    styleUrl: './performance-of-agents.component.scss'
})
export class PerformanceOfAgentsComponent {

    displayedColumns: string[] = ['agentID', 'agent', 'totalTickets', 'openTickets', 'resolvedTickets', 'aveResolutionTime', 'satisfactionRate', 'action'];
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
        agentID: '#158',
        agent: {
            img: 'images/users/user15.jpg',
            name: 'Walter Frazier'
        },
        totalTickets: 120,
        openTickets: 15,
        resolvedTickets: 105,
        aveResolutionTime: "4.5 hours",
        satisfactionRate: 90,
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#325',
        agent: {
            img: 'images/users/user7.jpg',
            name: 'Kimberly Anderson'
        },
        totalTickets: 150,
        openTickets: 20,
        resolvedTickets: 130,
        aveResolutionTime: "5.2 hours",
        satisfactionRate: 85,
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#286',
        agent: {
            img: 'images/users/user5.jpg',
            name: 'Roscoe Guerrero'
        },
        totalTickets: 80,
        openTickets: 5,
        resolvedTickets: 75,
        aveResolutionTime: "3.4 hours",
        satisfactionRate: 95,
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#463',
        agent: {
            img: 'images/users/user12.jpg',
            name: 'Robert Stewart'
        },
        totalTickets: 100,
        openTickets: 10,
        resolvedTickets: 90,
        aveResolutionTime: "4.7 hours",
        satisfactionRate: 80,
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#579',
        agent: {
            img: 'images/users/user6.jpg',
            name: 'Dustin Fritch'
        },
        totalTickets: 180,
        openTickets: 25,
        resolvedTickets: 165,
        aveResolutionTime: "3.9 hours",
        satisfactionRate: 85,
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#860',
        agent: {
            img: 'images/users/user3.jpg',
            name: 'Jasper Chatman'
        },
        totalTickets: 90,
        openTickets: 20,
        resolvedTickets: 70,
        aveResolutionTime: "5.5 hours",
        satisfactionRate: 95,
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#860',
        agent: {
            img: 'images/users/user3.jpg',
            name: 'Jasper Chatman'
        },
        totalTickets: 90,
        openTickets: 20,
        resolvedTickets: 70,
        aveResolutionTime: "5.5 hours",
        satisfactionRate: 95,
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#579',
        agent: {
            img: 'images/users/user6.jpg',
            name: 'Dustin Fritch'
        },
        totalTickets: 180,
        openTickets: 25,
        resolvedTickets: 165,
        aveResolutionTime: "3.9 hours",
        satisfactionRate: 85,
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#463',
        agent: {
            img: 'images/users/user12.jpg',
            name: 'Robert Stewart'
        },
        totalTickets: 100,
        openTickets: 10,
        resolvedTickets: 90,
        aveResolutionTime: "4.7 hours",
        satisfactionRate: 80,
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#286',
        agent: {
            img: 'images/users/user5.jpg',
            name: 'Roscoe Guerrero'
        },
        totalTickets: 80,
        openTickets: 5,
        resolvedTickets: 75,
        aveResolutionTime: "3.4 hours",
        satisfactionRate: 95,
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#325',
        agent: {
            img: 'images/users/user7.jpg',
            name: 'Kimberly Anderson'
        },
        totalTickets: 150,
        openTickets: 20,
        resolvedTickets: 130,
        aveResolutionTime: "5.2 hours",
        satisfactionRate: 85,
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#463',
        agent: {
            img: 'images/users/user12.jpg',
            name: 'Robert Stewart'
        },
        totalTickets: 100,
        openTickets: 10,
        resolvedTickets: 90,
        aveResolutionTime: "4.7 hours",
        satisfactionRate: 80,
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    }
];

export interface PeriodicElement {
    agentID: string;
    agent: any;
    totalTickets: number;
    openTickets: number;
    resolvedTickets: number;
    aveResolutionTime: string;
    satisfactionRate: number;
    action: any;
}