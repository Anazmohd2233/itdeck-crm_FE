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
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-contacts',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf, MatCheckboxModule, MatTooltipModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, MatInputModule],
    templateUrl: './contacts.component.html',
    styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

    displayedColumns: string[] = ['select', 'contactID', 'customer', 'email', 'phone', 'lastContacted', 'course', 'leadSource', 'paidAmount', 'balanceAmount', 'status', 'action'];
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
        public themeService: CustomizerSettingsService,
        private snackBar: MatSnackBar
    ) {}

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    link: string = 'https://iprulers-crm.vercel.app/student-registration';

    copyToClipboard(input: HTMLInputElement) {
      input.select();
      document.execCommand('copy');
      this.snackBar.open('Link copied to clipboard!', 'Close', { duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'});

    }

}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        contactID: '#ARP-1217',
        customer: {
            img: 'images/users/user15.jpg',
            name: 'Marcia Baker'
        },
        email: 'marcia@example.com',
        phone: '+1 555-123-4567',
        lastContacted: 'Nov 10, 2024',
        course: 'ABC Corporation',
        leadSource: 'Meta',
        paidAmount: 50,
        balanceAmount: 25,
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            link: 'link',
            delete: 'delete'
        }
    },
    {
        contactID: '#ARP-1364',
        customer: {
            img: 'images/users/user7.jpg',
            name: 'Carolyn Barnes'
        },
        email: 'barnes@example.com',
        phone: '+1 555-987-6543',
        lastContacted: 'Nov 11, 2024',
        course: 'XYZ Ltd',
        leadSource: 'Meta',
        paidAmount: 50,
        balanceAmount: 25,
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            link: 'link',
            delete: 'delete'
        }
    },
    {
        contactID: '#ARP-2951',
        customer: {
            img: 'images/users/user12.jpg',
            name: 'Donna Miller'
        },
        email: 'donna@example.com',
        phone: '+1 555-456-7890',
        lastContacted: 'Nov 12, 2024',
        course: 'Tech Solutions',
        leadSource: 'Meta',
        paidAmount: 50,
        balanceAmount: 25,
        status: {
            // active: 'Active',
            deactive: 'Deactive',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            link: 'link',
            delete: 'delete'
        }
    },
    {
        contactID: '#ARP-7342',
        customer: {
            img: 'images/users/user5.jpg',
            name: 'Barbara Cross'
        },
        email: 'cross@example.com',
        phone: '+1 555-369-7878',
        lastContacted: 'Nov 13, 2024',
        course: 'Global Solutions',
        leadSource: 'Meta',
        paidAmount: 50,
        balanceAmount: 25,
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            link: 'link',
            delete: 'delete'
        }
    },
    {
        contactID: '#ARP-4619',
        customer: {
            img: 'images/users/user16.jpg',
            name: 'Rebecca Block'
        },
        email: 'block@example.com',
        phone: '+1 555-658-4488',
        lastContacted: 'Nov 14, 2024',
        course: 'Acma Industries',
        leadSource: 'Meta',
        paidAmount: 50,
        balanceAmount: 25,
        status: {
            // active: 'Active',
            deactive: 'Deactive',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            link: 'link',
            delete: 'delete'
        }
    },

    // {
    //     contactID: '#ARP-7346',
    //     customer: {
    //         img: 'images/users/user9.jpg',
    //         name: 'Ramiro McCarty'
    //     },
    //     email: 'ramiro@example.com',
    //     phone: '+1 555-558-9966',
    //     lastContacted: 'Nov 15, 2024',
    //     course: 'Synergy Ltd',
    //     leadSource: 'Meta',
    //     paidAmount: 50,
    //     balanceAmount: 25,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         link: 'link',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     contactID: '#ARP-7612',
    //     customer: {
    //         img: 'images/users/user1.jpg',
    //         name: 'Robert Fairweather'
    //     },
    //     email: 'robert@example.com',
    //     phone: '+1 555-357-5888',
    //     lastContacted: 'Nov 16, 2024',
    //     course: 'Summit Solutions',
    //     leadSource: 'Meta',
    //     paidAmount: 50,
    //     balanceAmount: 25,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         link: 'link',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     contactID: '#ARP-7642',
    //     customer: {
    //         img: 'images/users/user6.jpg',
    //         name: 'Marcelino Haddock'
    //     },
    //     email: 'haddock@example.com',
    //     phone: '+1 555-456-8877',
    //     lastContacted: 'Nov 17, 2024',
    //     course: 'Strategies Ltd',
    //     leadSource: 'Meta',
    //     paidAmount: 50,
    //     balanceAmount: 25,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         link: 'link',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     contactID: '#ARP-4652',
    //     customer: {
    //         img: 'images/users/user13.jpg',
    //         name: 'Thomas Wilson'
    //     },
    //     email: 'wildon@example.com',
    //     phone: '+1 555-622-4488',
    //     lastContacted: 'Nov 18, 2024',
    //     course: 'Tech Enterprises',
    //     leadSource: 'Meta',
    //     paidAmount: 50,
    //     balanceAmount: 25,
    //     status: {
    //         // active: 'Active',
    //         deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         link: 'link',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     contactID: '#ARP-7895',
    //     customer: {
    //         img: 'images/users/user14.jpg',
    //         name: 'Nathaniel Hulsey'
    //     },
    //     email: 'hulsey@example.com',
    //     phone: '+1 555-225-4488',
    //     lastContacted: 'Nov 19, 2024',
    //     course: 'Synetic Solutions',
    //     leadSource: 'Meta',
    //     paidAmount: 50,
    //     balanceAmount: 25,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         link: 'link',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     contactID: '#ARP-7895',
    //     customer: {
    //         img: 'images/users/user14.jpg',
    //         name: 'Nathaniel Hulsey'
    //     },
    //     email: 'hulsey@example.com',
    //     phone: '+1 555-225-4488',
    //     lastContacted: 'Nov 19, 2024',
    //     course: 'Synetic Solutions',
    //     leadSource: 'Meta',
    //     paidAmount: 50,
    //     balanceAmount: 25,
    //     status: {
    //         // active: 'Active',
    //         deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         link: 'link',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     contactID: '#ARP-4652',
    //     customer: {
    //         img: 'images/users/user13.jpg',
    //         name: 'Thomas Wilson'
    //     },
    //     email: 'wildon@example.com',
    //     phone: '+1 555-622-4488',
    //     lastContacted: 'Nov 18, 2024',
    //     course: 'Tech Enterprises',
    //     leadSource: 'Meta',
    //     paidAmount: 50,
    //     balanceAmount: 25,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         link: 'link',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     contactID: '#ARP-7642',
    //     customer: {
    //         img: 'images/users/user6.jpg',
    //         name: 'Marcelino Haddock'
    //     },
    //     email: 'haddock@example.com',
    //     phone: '+1 555-456-8877',
    //     lastContacted: 'Nov 17, 2024',
    //     course: 'Strategies Ltd',
    //     leadSource: 'Meta',
    //     paidAmount: 50,
    //     balanceAmount: 25,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         link: 'link',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     contactID: '#ARP-7612',
    //     customer: {
    //         img: 'images/users/user1.jpg',
    //         name: 'Robert Fairweather'
    //     },
    //     email: 'robert@example.com',
    //     phone: '+1 555-357-5888',
    //     lastContacted: 'Nov 16, 2024',
    //     course: 'Summit Solutions',
    //     leadSource: 'Meta',
    //     paidAmount: 50,
    //     balanceAmount: 25,
    //     status: {
    //         // active: 'Active',
    //         deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         link: 'link',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     contactID: '#ARP-7346',
    //     customer: {
    //         img: 'images/users/user9.jpg',
    //         name: 'Ramiro McCarty'
    //     },
    //     email: 'ramiro@example.com',
    //     phone: '+1 555-558-9966',
    //     lastContacted: 'Nov 15, 2024',
    //     course: 'Synergy Ltd',
    //     leadSource: 'Meta',
    //     paidAmount: 50,
    //     balanceAmount: 25,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         link: 'link',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     contactID: '#ARP-4619',
    //     customer: {
    //         img: 'images/users/user16.jpg',
    //         name: 'Rebecca Block'
    //     },
    //     email: 'block@example.com',
    //     phone: '+1 555-658-4488',
    //     lastContacted: 'Nov 14, 2024',
    //     course: 'Acma Industries',
    //     leadSource: 'Meta',
    //     paidAmount: 50,
    //     balanceAmount: 25,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         link: 'link',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     contactID: '#ARP-7342',
    //     customer: {
    //         img: 'images/users/user5.jpg',
    //         name: 'Barbara Cross'
    //     },
    //     email: 'cross@example.com',
    //     phone: '+1 555-369-7878',
    //     lastContacted: 'Nov 13, 2024',
    //     course: 'Global Solutions',
    //     leadSource: 'Meta',
    //     paidAmount: 50,
    //     balanceAmount: 25,
    //     status: {
    //         // active: 'Active',
    //         deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         link: 'link',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     contactID: '#ARP-2951',
    //     customer: {
    //         img: 'images/users/user12.jpg',
    //         name: 'Donna Miller'
    //     },
    //     email: 'donna@example.com',
    //     phone: '+1 555-456-7890',
    //     lastContacted: 'Nov 12, 2024',
    //     course: 'Tech Solutions',
    //     leadSource: 'Meta',
    //     paidAmount: 50,
    //     balanceAmount: 25,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         link: 'link',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     contactID: '#ARP-1364',
    //     customer: {
    //         img: 'images/users/user7.jpg',
    //         name: 'Carolyn Barnes'
    //     },
    //     email: 'barnes@example.com',
    //     phone: '+1 555-987-6543',
    //     lastContacted: 'Nov 11, 2024',
    //     course: 'XYZ Ltd',
    //     leadSource: 'Meta',
    //     paidAmount: 50,
    //     balanceAmount: 25,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         link: 'link',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     contactID: '#ARP-1217',
    //     customer: {
    //         img: 'images/users/user15.jpg',
    //         name: 'Marcia Baker'
    //     },
    //     email: 'marcia@example.com',
    //     phone: '+1 555-123-4567',
    //     lastContacted: 'Nov 10, 2024',
    //     course: 'ABC Corporation',
    //     leadSource: 'Meta',
    //     paidAmount: 50,
    //     balanceAmount: 25,
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         link: 'link',
    //         delete: 'delete'
    //     }
    // }
];

export interface PeriodicElement {
    contactID: string;
    customer: any;
    email: string;
    phone: string;
    lastContacted: string;
    course: string;
    leadSource: string;
    paidAmount: 50,
    balanceAmount: 25,
    status: any;
    action: any;
}