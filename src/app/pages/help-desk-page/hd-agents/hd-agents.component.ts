import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-hd-agents',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, MatProgressBarModule, MatTooltipModule],
    templateUrl: './hd-agents.component.html',
    styleUrl: './hd-agents.component.scss'
})
export class HdAgentsComponent {

    displayedColumns: string[] = ['agentID', 'agent', 'email', 'role', 'ticketsAssigned', 'ticketsResolved', 'availability', 'action'];
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
            name: 'Marcia Baker'
        },
        ticketsAssigned: 10,
        ticketsResolved: 6,
        availability: 'Available',
        email: 'marcia@example.com',
        role: 'Support Agent',
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
            name: 'Carolyn Barnes'
        },
        ticketsAssigned: 15,
        ticketsResolved: 10,
        availability: 'Available',
        email: 'barnes@example.com',
        role: 'Senior Agent',
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#286',
        agent: {
            img: 'images/users/user12.jpg',
            name: 'Donna Miller'
        },
        ticketsAssigned: 9,
        ticketsResolved: 6,
        availability: 'Available',
        email: 'donna@example.com',
        role: 'Support Agent',
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#463',
        agent: {
            img: 'images/users/user5.jpg',
            name: 'Barbara Cross'
        },
        ticketsAssigned: 6,
        ticketsResolved: 4,
        availability: 'Available',
        email: 'cross@example.com',
        role: 'Senior Agent',
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#579',
        agent: {
            img: 'images/users/user16.jpg',
            name: 'Rebecca Block'
        },
        ticketsAssigned: 5,
        ticketsResolved: 2,
        availability: 'Available',
        email: 'block@example.com',
        role: 'Junior Agent',
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#860',
        agent: {
            img: 'images/users/user9.jpg',
            name: 'Ramiro McCarty'
        },
        ticketsAssigned: 12,
        ticketsResolved: 8,
        availability: 'Not Available',
        email: 'ramiro@example.com',
        role: 'Support Agent',
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#491',
        agent: {
            img: 'images/users/user1.jpg',
            name: 'Robert Fairweather'
        },
        ticketsAssigned: 8,
        ticketsResolved: 6,
        availability: 'Available',
        email: 'robert@example.com',
        role: 'Support Agent',
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#125',
        agent: {
            img: 'images/users/user6.jpg',
            name: 'Marcelino Haddock'
        },
        ticketsAssigned: 13,
        ticketsResolved: 9,
        availability: 'Available',
        email: 'haddock@example.com',
        role: 'Support Agent',
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#436',
        agent: {
            img: 'images/users/user13.jpg',
            name: 'Thomas Wilson'
        },
        ticketsAssigned: 10,
        ticketsResolved: 5,
        availability: 'Available',
        email: 'wildon@example.com',
        role: 'Junior Agent',
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#998',
        agent: {
            img: 'images/users/user14.jpg',
            name: 'Nathaniel Hulsey'
        },
        ticketsAssigned: 7,
        ticketsResolved: 6,
        availability: 'Not Available',
        email: 'hulsey@example.com',
        role: 'Senior Agent',
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#998',
        agent: {
            img: 'images/users/user14.jpg',
            name: 'Nathaniel Hulsey'
        },
        ticketsAssigned: 7,
        ticketsResolved: 6,
        availability: 'Not Available',
        email: 'hulsey@example.com',
        role: 'Senior Agent',
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#436',
        agent: {
            img: 'images/users/user13.jpg',
            name: 'Thomas Wilson'
        },
        ticketsAssigned: 10,
        ticketsResolved: 5,
        availability: 'Available',
        email: 'wildon@example.com',
        role: 'Junior Agent',
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#125',
        agent: {
            img: 'images/users/user6.jpg',
            name: 'Marcelino Haddock'
        },
        ticketsAssigned: 13,
        ticketsResolved: 9,
        availability: 'Available',
        email: 'haddock@example.com',
        role: 'Support Agent',
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#491',
        agent: {
            img: 'images/users/user1.jpg',
            name: 'Robert Fairweather'
        },
        ticketsAssigned: 8,
        ticketsResolved: 6,
        availability: 'Available',
        email: 'robert@example.com',
        role: 'Support Agent',
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        agentID: '#860',
        agent: {
            img: 'images/users/user9.jpg',
            name: 'Ramiro McCarty'
        },
        ticketsAssigned: 12,
        ticketsResolved: 8,
        availability: 'Not Available',
        email: 'ramiro@example.com',
        role: 'Support Agent',
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
    ticketsAssigned: number;
    ticketsResolved: number;
    availability: string;
    email: string;
    role: string;
    action: any;
}