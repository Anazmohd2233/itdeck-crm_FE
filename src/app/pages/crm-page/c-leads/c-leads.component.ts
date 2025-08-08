import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewLeadsComponent } from './new-leads/new-leads.component';
import { ActiveLeadsComponent } from './active-leads/active-leads.component';
import { RevenueGrowthComponent } from './revenue-growth/revenue-growth.component';
import { MatCardModule } from '@angular/material/card';
import { LeadConversionComponent } from './lead-conversion/lead-conversion.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButtonModule } from '@angular/material/button';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CLeadKanbanComponent } from '../c-lead-kanban/c-lead-kanban.component';

@Component({
    selector: 'app-c-leads',
    imports: [RouterLink, MatCardModule, NewLeadsComponent, ActiveLeadsComponent, LeadConversionComponent, RevenueGrowthComponent, MatTabsModule, MatIconModule, MatTooltipModule, MatCheckboxModule, NgIf, MatPaginatorModule, MatTableModule, MatButtonModule, CLeadKanbanComponent],
    templateUrl: './c-leads.component.html',
    styleUrl: './c-leads.component.scss'
})
export class CLeadsComponent {

    displayedColumns: string[] = ['select', 'id', 'customer', 'email', 'phone', 'createDate', 'company', 'assignedTo', 'leadSource', 'status', 'action'];
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
        id: ' #ARP-1217',
        customer: {
            img: 'images/users/user15.jpg',
            name: 'Marcia Baker'
        },
        email: 'marcia@example.com',
        phone: '+1 555-123-4567',
        createDate: 'Nov 10, 2024',
        company: 'ABC Corporation',
        assignedTo: ['executive_1'],
        leadSource: 'Website',
        status: {
            new: 'New',
            // won: 'Won',
            // inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            createTask: 'add_task',
            delete: 'delete'
        }
    },
    {
        id: '#FDA-1364',
        customer: {
            img: 'images/users/user7.jpg',
            name: 'Carolyn Barnes'
        },
        email: 'barnes@example.com',
        phone: '+1 555-987-6543',
        createDate: 'Nov 11, 2024',
        company: 'XYZ Ltd',
        assignedTo: ['executive_1'],
        leadSource: 'Referral',
        status: {
            // new: 'New',
            won: 'Won',
            // inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            createTask: 'add_task',
            delete: 'delete'
        }
    },
    {
        id: '#DES-1364',
        customer: {
            img: 'images/users/user12.jpg',
            name: 'Donna Miller'
        },
        email: 'donna@example.com',
        phone: '+1 555-456-7890',
        createDate: 'Nov 12, 2024',
        company: 'Tech Solutions',
        assignedTo: ['executive_3'],
        leadSource: 'Cold Call',
        status: {
            // new: 'New',
            // won: 'Won',
            inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            createTask: 'add_task',
            delete: 'delete'
        }
    },
    {
        id: '#DCV-7342',
        customer: {
            img: 'images/users/user5.jpg',
            name: 'Barbara Cross'
        },
        email: 'cross@example.com',
        phone: '+1 555-369-7878',
        createDate: 'Nov 13, 2024',
        company: 'Global Solutions',
        assignedTo: ['executive_1'],
        leadSource: 'Email Campaign',
        status: {
            new: 'New',
            // won: 'Won',
            // inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            createTask: 'add_task',
            delete: 'delete'
        }
    },
    {
        id: '#ASW-4619',
        customer: {
            img: 'images/users/user16.jpg',
            name: 'Rebecca Block'
        },
        email: 'block@example.com',
        phone: '+1 555-658-4488',
        createDate: 'Nov 14, 2024',
        company: 'Acma Industries',
        assignedTo: ['executive_2'],
        leadSource: 'Online Store',
        status: {
            // new: 'New',
            // won: 'Won',
            // inProgress: 'In Progress',
            lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            createTask: 'add_task',
            delete: 'delete'
        }
    },

    // {
    //     id: '#AFR-7346',
    //     customer: {
    //         img: 'images/users/user9.jpg',
    //         name: 'Ramiro McCarty'
    //     },
    //     email: 'ramiro@example.com',
    //     phone: '+1 555-558-9966',
    //     createDate: 'Nov 15, 2024',
    //     company: 'Synergy Ltd',
    //     assignedTo: ['executive_5'],
    //     leadSource: 'Website',
    //     status: {
    //         // new: 'New',
    //         // won: 'Won',
    //         inProgress: 'In Progress',
    //         // lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         createTask: 'add_task',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#WSA-7612',
    //     customer: {
    //         img: 'images/users/user1.jpg',
    //         name: 'Robert Fairweather'
    //     },
    //     email: 'robert@example.com',
    //     phone: '+1 555-357-5888',
    //     createDate: 'Nov 16, 2024',
    //     company: 'Summit Solutions',
    //     assignedTo: ['executive_1'],
    //     leadSource: 'Email Campaign',
    //     status: {
    //         new: 'New',
    //         // won: 'Won',
    //         // inProgress: 'In Progress',
    //         // lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         createTask: 'add_task',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#AQD-7642',
    //     customer: {
    //         img: 'images/users/user6.jpg',
    //         name: 'Marcelino Haddock'
    //     },
    //     email: 'haddock@example.com',
    //     phone: '+1 555-456-8877',
    //     createDate: 'Nov 17, 2024',
    //     company: 'Strategies Ltd',
    //     assignedTo: ['executive_5'],
    //     leadSource: 'Cold Call',
    //     status: {
    //         new: 'New',
    //         // won: 'Won',
    //         // inProgress: 'In Progress',
    //         // lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         createTask: 'add_task',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#TGS-4652',
    //     customer: {
    //         img: 'images/users/user13.jpg',
    //         name: 'Thomas Wilson'
    //     },
    //     email: 'wildon@example.com',
    //     phone: '+1 555-622-4488',
    //     createDate: 'Nov 18, 2024',
    //     company: 'Tech Enterprises',
    //     assignedTo: ['executive_1'],
    //     leadSource: 'Referral',
    //     status: {
    //         // new: 'New',
    //         won: 'Won',
    //         // inProgress: 'In Progress',
    //         // lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         createTask: 'add_task',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#EGC-7895',
    //     customer: {
    //         img: 'images/users/user14.jpg',
    //         name: 'Nathaniel Hulsey'
    //     },
    //     email: 'hulsey@example.com',
    //     phone: '+1 555-225-4488',
    //     createDate: 'Nov 19, 2024',
    //     company: 'Synetic Solutions',
    //     assignedTo: ['executive_2'],
    //     leadSource: 'Website',
    //     status: {
    //         // new: 'New',
    //         // won: 'Won',
    //         // inProgress: 'In Progress',
    //         lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         createTask: 'add_task',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#DFR-7895',
    //     customer: {
    //         img: 'images/users/user14.jpg',
    //         name: 'Nathaniel Hulsey'
    //     },
    //     email: 'hulsey@example.com',
    //     phone: '+1 555-225-4488',
    //     createDate: 'Nov 19, 2024',
    //     company: 'Synetic Solutions',
    //     assignedTo: ['executive_3'],
    //     leadSource: 'Website',
    //     status: {
    //         // new: 'New',
    //         // won: 'Won',
    //         // inProgress: 'In Progress',
    //         lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         createTask: 'add_task',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#SQA-4652',
    //     customer: {
    //         img: 'images/users/user13.jpg',
    //         name: 'Thomas Wilson'
    //     },
    //     email: 'wildon@example.com',
    //     phone: '+1 555-622-4488',
    //     createDate: 'Nov 18, 2024',
    //     company: 'Tech Enterprises',
    //     assignedTo: ['executive_3'],
    //     leadSource: 'Referral',
    //     status: {
    //         // new: 'New',
    //         won: 'Won',
    //         // inProgress: 'In Progress',
    //         // lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         createTask: 'add_task',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#FBG-7642',
    //     customer: {
    //         img: 'images/users/user6.jpg',
    //         name: 'Marcelino Haddock'
    //     },
    //     email: 'haddock@example.com',
    //     phone: '+1 555-456-8877',
    //     createDate: 'Nov 17, 2024',
    //     company: 'Strategies Ltd',
    //     assignedTo: ['executive_4'],
    //     leadSource: 'Cold Call',
    //     status: {
    //         new: 'New',
    //         // won: 'Won',
    //         // inProgress: 'In Progress',
    //         // lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         createTask: 'add_task',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#RTF-7612',
    //     customer: {
    //         img: 'images/users/user1.jpg',
    //         name: 'Robert Fairweather'
    //     },
    //     email: 'robert@example.com',
    //     phone: '+1 555-357-5888',
    //     createDate: 'Nov 16, 2024',
    //     company: 'Summit Solutions',
    //     assignedTo: ['executive_4'],
    //     leadSource: 'Email Campaign',
    //     status: {
    //         new: 'New',
    //         // won: 'Won',
    //         // inProgress: 'In Progress',
    //         // lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         createTask: 'add_task',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#JHY-7346',
    //     customer: {
    //         img: 'images/users/user9.jpg',
    //         name: 'Ramiro McCarty'
    //     },
    //     email: 'ramiro@example.com',
    //     phone: '+1 555-558-9966',
    //     createDate: 'Nov 15, 2024',
    //     company: 'Synergy Ltd',
    //     assignedTo: ['executive_2'],
    //     leadSource: 'Website',
    //     status: {
    //         // new: 'New',
    //         // won: 'Won',
    //         inProgress: 'In Progress',
    //         // lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         createTask: 'add_task',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#IKG-4619',
    //     customer: {
    //         img: 'images/users/user16.jpg',
    //         name: 'Rebecca Block'
    //     },
    //     email: 'block@example.com',
    //     phone: '+1 555-658-4488',
    //     createDate: 'Nov 14, 2024',
    //     company: 'Acma Industries',
    //     assignedTo: ['executive_6'],
    //     leadSource: 'Online Store',
    //     status: {
    //         // new: 'New',
    //         // won: 'Won',
    //         // inProgress: 'In Progress',
    //         lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         createTask: 'add_task',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#THB-7342',
    //     customer: {
    //         img: 'images/users/user5.jpg',
    //         name: 'Barbara Cross'
    //     },
    //     email: 'cross@example.com',
    //     phone: '+1 555-369-7878',
    //     createDate: 'Nov 13, 2024',
    //     company: 'Global Solutions',
    //     assignedTo: ['executive_3'],
    //     leadSource: 'Email Campaign',
    //     status: {
    //         new: 'New',
    //         // won: 'Won',
    //         // inProgress: 'In Progress',
    //         // lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         createTask: 'add_task',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#NMK-1364',
    //     customer: {
    //         img: 'images/users/user12.jpg',
    //         name: 'Donna Miller'
    //     },
    //     email: 'donna@example.com',
    //     phone: '+1 555-456-7890',
    //     createDate: 'Nov 12, 2024',
    //     company: 'Tech Solutions',
    //     assignedTo: [ 'executive_5'],
    //     leadSource: 'Cold Call',
    //     status: {
    //         // new: 'New',
    //         // won: 'Won',
    //         inProgress: 'In Progress',
    //         // lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         createTask: 'add_task',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#PLO-1364',
    //     customer: {
    //         img: 'images/users/user7.jpg',
    //         name: 'Carolyn Barnes'
    //     },
    //     email: 'barnes@example.com',
    //     phone: '+1 555-987-6543',
    //     createDate: 'Nov 11, 2024',
    //     company: 'XYZ Ltd',
    //     assignedTo: ['executive_6'],
    //     leadSource: 'Referral',
    //     status: {
    //         // new: 'New',
    //         won: 'Won',
    //         // inProgress: 'In Progress',
    //         // lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         createTask: 'add_task',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: ' #UIK-1217',
    //     customer: {
    //         img: 'images/users/user15.jpg',
    //         name: 'Marcia Baker'
    //     },
    //     email: 'marcia@example.com',
    //     phone: '+1 555-123-4567',
    //     createDate: 'Nov 10, 2024',
    //     company: 'ABC Corporation',
    //     assignedTo: [ 'executive_3',],
    //     leadSource: 'Website',
    //     status: {
    //         new: 'New',
    //         // won: 'Won',
    //         // inProgress: 'In Progress',
    //         // lost: 'Lost',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         createTask: 'add_task',
    //         delete: 'delete'
    //     }
    // }
];

export interface PeriodicElement {
    id: string;
    customer: any;
    email: string;
    phone: string;
    createDate: string;
    company: string;
    leadSource: string;
    assignedTo: any;
    status: any;
    action: any;
}