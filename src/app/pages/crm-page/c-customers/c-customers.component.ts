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
    selector: 'app-c-customers',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf, MatCheckboxModule, MatTooltipModule],
    templateUrl: './c-customers.component.html',
    styleUrl: './c-customers.component.scss'
})
export class CCustomersComponent {

    displayedColumns: string[] = ['select', 'customerID', 'customer', 'email', 'phone', 'lastLogin', 'received', 'due', 'status', 'action'];
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
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.customer + 1}`;
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
        customerID: '#ARP-1217',
        customer: {
            img: 'images/users/user15.jpg',
            name: 'Marcia Baker'
        },
        email: 'marcia@example.com',
        phone: '+1 555-123-4567',
        lastLogin: 'Nov 10, 2024',
        received: '$6855.00',
        due: 125,
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        customerID: '#ARP-1364',
        customer: {
            img: 'images/users/user7.jpg',
            name: 'Carolyn Barnes'
        },
        email: 'barnes@example.com',
        phone: '+1 555-987-6543',
        lastLogin: 'Nov 11, 2024',
        received: '$258.00',
        due: 99,
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        customerID: '#ARP-2951',
        customer: {
            img: 'images/users/user12.jpg',
            name: 'Donna Miller'
        },
        email: 'donna@example.com',
        phone: '+1 555-456-7890',
        lastLogin: 'Nov 12, 2024',
        received: '$3,890.00',
        due: 145,
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        customerID: '#ARP-7342',
        customer: {
            img: 'images/users/user5.jpg',
            name: 'Barbara Cross'
        },
        email: 'cross@example.com',
        phone: '+1 555-369-7878',
        lastLogin: 'Nov 13, 2024',
        received: '$2,500.00',
        due: 279,
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        customerID: '#ARP-4619',
        customer: {
            img: 'images/users/user16.jpg',
            name: 'Rebecca Block'
        },
        email: 'block@example.com',
        phone: '+1 555-658-4488',
        lastLogin: 'Nov 14, 2024',
        received: '$8,200.00',
        due: 169,
        status: {
            // active: 'Active',
            deactive: 'Deactive',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },

    // {
    //     customerID: '#ARP-7346',
    //     customer: {
    //         img: 'images/users/user9.jpg',
    //         name: 'Ramiro McCarty'
    //     },
    //     email: 'ramiro@example.com',
    //     phone: '+1 555-558-9966',
    //     lastLogin: 'Nov 15, 2024',
    //     received: '$640.00',
    //     due: 46,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     customerID: '#ARP-7612',
    //     customer: {
    //         img: 'images/users/user1.jpg',
    //         name: 'Robert Fairweather'
    //     },
    //     email: 'robert@example.com',
    //     phone: '+1 555-357-5888',
    //     lastLogin: 'Nov 16, 2024',
    //     received: '$9,100.00',
    //     due: 184,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     customerID: '#ARP-7642',
    //     customer: {
    //         img: 'images/users/user6.jpg',
    //         name: 'Marcelino Haddock'
    //     },
    //     email: 'haddock@example.com',
    //     phone: '+1 555-456-8877',
    //     lastLogin: 'Nov 17, 2024',
    //     received: '$7,300.00',
    //     due: 166,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     customerID: '#ARP-4652',
    //     customer: {
    //         img: 'images/users/user13.jpg',
    //         name: 'Thomas Wilson'
    //     },
    //     email: 'wildon@example.com',
    //     phone: '+1 555-622-4488',
    //     lastLogin: 'Nov 18, 2024',
    //     received: '$6,600.00',
    //     due: 75,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     customerID: '#ARP-7895',
    //     customer: {
    //         img: 'images/users/user14.jpg',
    //         name: 'Nathaniel Hulsey'
    //     },
    //     email: 'hulsey@example.com',
    //     phone: '+1 555-225-4488',
    //     lastLogin: 'Nov 19, 2024',
    //     received: '$2,800.00',
    //     due: 55,
    //     status: {
    //         // active: 'Active',
    //         deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     customerID: '#ARP-7895',
    //     customer: {
    //         img: 'images/users/user14.jpg',
    //         name: 'Nathaniel Hulsey'
    //     },
    //     email: 'hulsey@example.com',
    //     phone: '+1 555-225-4488',
    //     lastLogin: 'Nov 19, 2024',
    //     received: '$2,800.00',
    //     due: 55,
    //     status: {
    //         // active: 'Active',
    //         deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     customerID: '#ARP-4652',
    //     customer: {
    //         img: 'images/users/user13.jpg',
    //         name: 'Thomas Wilson'
    //     },
    //     email: 'wildon@example.com',
    //     phone: '+1 555-622-4488',
    //     lastLogin: 'Nov 18, 2024',
    //     received: '$6,600.00',
    //     due: 75,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     customerID: '#ARP-7642',
    //     customer: {
    //         img: 'images/users/user6.jpg',
    //         name: 'Marcelino Haddock'
    //     },
    //     email: 'haddock@example.com',
    //     phone: '+1 555-456-8877',
    //     lastLogin: 'Nov 17, 2024',
    //     received: '$7,300.00',
    //     due: 166,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     customerID: '#ARP-7612',
    //     customer: {
    //         img: 'images/users/user1.jpg',
    //         name: 'Robert Fairweather'
    //     },
    //     email: 'robert@example.com',
    //     phone: '+1 555-357-5888',
    //     lastLogin: 'Nov 16, 2024',
    //     received: '$9,100.00',
    //     due: 184,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     customerID: '#ARP-7346',
    //     customer: {
    //         img: 'images/users/user9.jpg',
    //         name: 'Ramiro McCarty'
    //     },
    //     email: 'ramiro@example.com',
    //     phone: '+1 555-558-9966',
    //     lastLogin: 'Nov 15, 2024',
    //     received: '$640.00',
    //     due: 46,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     customerID: '#ARP-4619',
    //     customer: {
    //         img: 'images/users/user16.jpg',
    //         name: 'Rebecca Block'
    //     },
    //     email: 'block@example.com',
    //     phone: '+1 555-658-4488',
    //     lastLogin: 'Nov 14, 2024',
    //     received: '$8,200.00',
    //     due: 169,
    //     status: {
    //         // active: 'Active',
    //         deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     customerID: '#ARP-7342',
    //     customer: {
    //         img: 'images/users/user5.jpg',
    //         name: 'Barbara Cross'
    //     },
    //     email: 'cross@example.com',
    //     phone: '+1 555-369-7878',
    //     lastLogin: 'Nov 13, 2024',
    //     received: '$2,500.00',
    //     due: 279,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     customerID: '#ARP-2951',
    //     customer: {
    //         img: 'images/users/user12.jpg',
    //         name: 'Donna Miller'
    //     },
    //     email: 'donna@example.com',
    //     phone: '+1 555-456-7890',
    //     lastLogin: 'Nov 12, 2024',
    //     received: '$3,890.00',
    //     due: 145,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     customerID: '#ARP-1364',
    //     customer: {
    //         img: 'images/users/user7.jpg',
    //         name: 'Carolyn Barnes'
    //     },
    //     email: 'barnes@example.com',
    //     phone: '+1 555-987-6543',
    //     lastLogin: 'Nov 11, 2024',
    //     received: '$258.00',
    //     due: 99,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     customerID: '#ARP-1217',
    //     customer: {
    //         img: 'images/users/user15.jpg',
    //         name: 'Marcia Baker'
    //     },
    //     email: 'marcia@example.com',
    //     phone: '+1 555-123-4567',
    //     lastLogin: 'Nov 10, 2024',
    //     received: '$6855.00',
    //     due: 125,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // }
];

export interface PeriodicElement {
    customerID: string;
    customer: any;
    email: string;
    phone: string;
    lastLogin: string;
    received: string;
    due: number;
    status: any;
    action: any;
}