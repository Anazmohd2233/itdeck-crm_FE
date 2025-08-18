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
import { ContactService } from '../../../services/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-c-contacts',
    imports: [
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        MatTableModule,
        MatPaginatorModule,
        NgIf,
        MatCheckboxModule,
        MatTooltipModule,
    ],
    templateUrl: './c-contacts.component.html',
    styleUrl: './c-contacts.component.scss',
})
export class CContactsComponent {
    ELEMENT_DATA: PeriodicElement[] = [];

    page: number = 1;
    contacts: any;

    displayedColumns: string[] = [
        'select',
        'contactID',
        'name',
        'email',
        'phone',
        'courses',
        'lead_source',
        'status',
        'action',
    ];
    dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
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
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
            row.name + 1
        }`;
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    constructor(
        public themeService: CustomizerSettingsService,
        private contactService: ContactService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.getContactList();
    }

    private getContactList(): void {
        this.contactService.getContact(this.page).subscribe({
            next: (response) => {
                if (response && response.success) {
                    const contacts = response.data?.contacts || [];

                    this.ELEMENT_DATA = contacts.map((u: any) => ({
                        id: u.id,
                        contactID: u.unique_id || 'N/A',

                        name: u.contact_name || 'N/A',
                        email: u.email || 'N/A',
                        lead_source: u.lead_source || 'N/A',

                        phone: u.phone || '-',
                        courses: u.courses.service_name || '-',
                        status: u.status,
                        action: '', // we will handle icons directly in template
                    }));

                    this.dataSource.data = this.ELEMENT_DATA;
                } else {
                    // this.toastr.error('Failed to load Contact', 'Failed');
                    console.error('Failed to load contact:', response?.message);
                }
            },
            error: (error) => {
                console.error('API error:', error);
            },
        });
    }
}

export interface PeriodicElement {
    id: any;
    contactID: string;
    name: any;
    email: string;
    phone: string;
    courses: string;
    lead_source: string;
    status: any;
    action: any;
}
