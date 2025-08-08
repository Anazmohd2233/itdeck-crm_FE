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
    selector: 'app-users-list',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, MatCheckboxModule, MatTooltipModule],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss'
})
export class UsersListComponent {

    displayedColumns: string[] = ['userID', 'user', 'email', 'location', 'phone', 'projects', 'joinDate', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
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
        userID: '#158',
        user: {
            img: 'images/users/user15.jpg',
            name: 'Marcia Baker'
        },
        email: 'marcia@example.com',
        location: 'Washington D.C',
        phone: '+1 555-445-4455',
        projects: 6,
        joinDate: '01 Dec, 2024',
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        userID: '#325',
        user: {
            img: 'images/users/user7.jpg',
            name: 'Carolyn Barnes'
        },
        email: 'barnes@example.com',
        location: 'Chicago',
        phone: '+1 555-455-9966',
        projects: 10,
        joinDate: '02 Dec, 2024',
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        userID: '#286',
        user: {
            img: 'images/users/user12.jpg',
            name: 'Donna Miller'
        },
        email: 'donna@example.com',
        location: 'Oklahoma City',
        phone: '+1 555-555-9922',
        projects: 6,
        joinDate: '03 Dec, 2024',
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        userID: '#463',
        user: {
            img: 'images/users/user5.jpg',
            name: 'Barbara Cross'
        },
        email: 'cross@example.com',
        location: 'San Diego',
        phone: '+1 555-445-7788',
        projects: 4,
        joinDate: '04 Dec, 2024',
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        userID: '#491',
        user: {
            img: 'images/users/user16.jpg',
            name: 'Rebecca Block'
        },
        email: 'block@example.com',
        location: 'Los Angeles',
        phone: '+1 555-333-2288',
        projects: 2,
        joinDate: '05 Dec, 2024',
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        userID: '#860',
        user: {
            img: 'images/users/user9.jpg',
            name: 'Ramiro McCarty'
        },
        email: 'ramiro@example.com',
        location: 'Las Vegas',
        phone: '+1 555-445-4455',
        projects: 8,
        joinDate: '06 Dec, 2024',
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        userID: '#431',
        user: {
            img: 'images/users/user1.jpg',
            name: 'Robert Fairweather'
        },
        email: 'robert@example.com',
        location: 'San Francisco',
        phone: '+1 555-555-9922',
        projects: 6,
        joinDate: '07 Dec, 2024',
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        userID: '#998',
        user: {
            img: 'images/users/user6.jpg',
            name: 'Marcelino Haddock'
        },
        email: 'haddock@example.com',
        location: 'Washington D.C',
        phone: '+1 555-455-9966',
        projects: 9,
        joinDate: '08 Dec, 2024',
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        userID: '#436',
        user: {
            img: 'images/users/user13.jpg',
            name: 'Thomas Wilson'
        },
        email: 'wildon@example.com',
        location: 'San Diego',
        phone: '+1 555-333-2288',
        projects: 5,
        joinDate: '10 Dec, 2024',
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        userID: '#125',
        user: {
            img: 'images/users/user14.jpg',
            name: 'Nathaniel Hulsey'
        },
        email: 'hulsey@example.com',
        location: 'Chicago',
        phone: '+1 555-445-7788',
        projects: 6,
        joinDate: '11 Dec, 2024',
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        userID: '#125',
        user: {
            img: 'images/users/user14.jpg',
            name: 'Nathaniel Hulsey'
        },
        email: 'hulsey@example.com',
        location: 'Chicago',
        phone: '+1 555-445-7788',
        projects: 6,
        joinDate: '12 Dec, 2024',
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        userID: '#436',
        user: {
            img: 'images/users/user13.jpg',
            name: 'Thomas Wilson'
        },
        email: 'wildon@example.com',
        location: 'San Diego',
        phone: '+1 555-333-2288',
        projects: 5,
        joinDate: '13 Dec, 2024',
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        userID: '#998',
        user: {
            img: 'images/users/user6.jpg',
            name: 'Marcelino Haddock'
        },
        email: 'haddock@example.com',
        location: 'Washington D.C',
        phone: '+1 555-455-9966',
        projects: 9,
        joinDate: '14 Dec, 2024',
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        userID: '#431',
        user: {
            img: 'images/users/user1.jpg',
            name: 'Robert Fairweather'
        },
        email: 'robert@example.com',
        location: 'San Francisco',
        phone: '+1 555-555-9922',
        projects: 6,
        joinDate: '15 Dec, 2024',
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        userID: '#860',
        user: {
            img: 'images/users/user9.jpg',
            name: 'Ramiro McCarty'
        },
        email: 'ramiro@example.com',
        location: 'Las Vegas',
        phone: '+1 555-445-4455',
        projects: 8,
        joinDate: '16 Dec, 2024',
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        userID: '#491',
        user: {
            img: 'images/users/user16.jpg',
            name: 'Rebecca Block'
        },
        email: 'block@example.com',
        location: 'Los Angeles',
        phone: '+1 555-333-2288',
        projects: 2,
        joinDate: '17 Dec, 2024',
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        userID: '#463',
        user: {
            img: 'images/users/user5.jpg',
            name: 'Barbara Cross'
        },
        email: 'cross@example.com',
        location: 'San Diego',
        phone: '+1 555-445-7788',
        projects: 4,
        joinDate: '18 Dec, 2024',
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        userID: '#286',
        user: {
            img: 'images/users/user12.jpg',
            name: 'Donna Miller'
        },
        email: 'donna@example.com',
        location: 'Oklahoma City',
        phone: '+1 555-555-9922',
        projects: 6,
        joinDate: '19 Dec, 2024',
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        userID: '#325',
        user: {
            img: 'images/users/user7.jpg',
            name: 'Carolyn Barnes'
        },
        email: 'barnes@example.com',
        location: 'Chicago',
        phone: '+1 555-455-9966',
        projects: 10,
        joinDate: '20 Dec, 2024',
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        userID: '#579',
        user: {
            img: 'images/users/user15.jpg',
            name: 'Marcia Baker'
        },
        email: 'marcia@example.com',
        location: 'Washington D.C',
        phone: '+1 555-445-4455',
        projects: 6,
        joinDate: '21 Dec, 2024',
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    }
];

export interface PeriodicElement {
    userID: string;
    user: any;
    email: string;
    location: string;
    phone: string;
    projects: number;
    joinDate: string;
    action: any;
}