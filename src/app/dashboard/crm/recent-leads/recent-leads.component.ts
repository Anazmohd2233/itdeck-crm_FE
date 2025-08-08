import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-recent-leads',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, MatTableModule, MatPaginatorModule, NgIf, MatCheckboxModule, MatTooltipModule],
    templateUrl: './recent-leads.component.html',
    styleUrl: './recent-leads.component.scss'
})
export class RecentLeadsComponent {

    displayedColumns: string[] = ['select', 'customer', 'email', 'source', 'status', 'action'];
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

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        customer: {
            img: 'images/users/user1.jpg',
            name: 'Carlos Daley'
        },
        email: 'carlos@daxa.com',
        source: 'Website',
        status: {
            new: 'New',
            // won: 'Won',
            // inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        customer: {
            img: 'images/users/user2.jpg',
            name: 'Dorothy Young'
        },
        email: 'dorothy@daxa.com',
        source: 'Referral',
        status: {
            // new: 'New',
            won: 'Won',
            // inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        customer: {
            img: 'images/users/user3.jpg',
            name: 'Greg Woody'
        },
        email: 'greg@daxa.com',
        source: 'Cold Call',
        status: {
            // new: 'New',
            // won: 'Won',
            inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        customer: {
            img: 'images/users/user4.jpg',
            name: 'Deborah Rosol'
        },
        email: 'deborah@daxa.com',
        source: 'Email Campaign',
        status: {
            // new: 'New',
            // won: 'Won',
            // inProgress: 'In Progress',
            lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    }
    // {
    //     customer: {
    //         img: 'images/users/user5.jpg',
    //         name: 'Kendall Allen'
    //     },
    //     email: 'kendall@daxa.com',
    //     source: 'Online Store',
    //     status: {
    //         new: 'New',
    //         // won: 'Won',
    //         // inProgress: 'In Progress',
    //         // lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     customer: {
    //         img: 'images/users/user6.jpg',
    //         name: 'Mark Stjohn'
    //     },
    //     email: 'mark@daxa.com',
    //     source: 'Online Store',
    //     status: {
    //         new: 'New',
    //         // won: 'Won',
    //         // inProgress: 'In Progress',
    //         // lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     customer: {
    //         img: 'images/users/user7.jpg',
    //         name: 'Joan Stanley'
    //     },
    //     email: 'joan@daxa.com',
    //     source: 'Email Campaign',
    //     status: {
    //         new: 'New',
    //         // won: 'Won',
    //         // inProgress: 'In Progress',
    //         // lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     customer: {
    //         img: 'images/users/user8.jpg',
    //         name: 'Jacob Bell'
    //     },
    //     email: 'jacob@daxa.com',
    //     source: 'Cold Call',
    //     status: {
    //         // new: 'New',
    //         won: 'Won',
    //         // inProgress: 'In Progress',
    //         // lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     customer: {
    //         img: 'images/users/user9.jpg',
    //         name: 'Donald Bryan'
    //     },
    //     email: 'donald@daxa.com',
    //     source: 'Referral',
    //     status: {
    //         // new: 'New',
    //         won: 'Won',
    //         // inProgress: 'In Progress',
    //         // lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     customer: {
    //         img: 'images/users/user10.jpg',
    //         name: 'Kristina Blomquist'
    //     },
    //     email: 'kristina@daxa.com',
    //     source: 'Website',
    //     status: {
    //         // new: 'New',
    //         // won: 'Won',
    //         // inProgress: 'In Progress',
    //         lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // }
];

export interface PeriodicElement {
    customer: any;
    email: string;
    source: string;
    status: any;
    action: any;
}