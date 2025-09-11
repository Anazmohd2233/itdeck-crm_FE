import { NgFor, NgIf } from '@angular/common';
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
import { HttpParams } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SchoolService } from '../../../services/school.service';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { UsersService } from '../../../services/users.service';

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
        MatFormFieldModule,
        MatSelectModule,

        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,

        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        NgIf,
        MatTooltipModule,
        MatProgressBarModule,
        NgFor,
        NgxMatSelectSearchModule,
    ],
    templateUrl: './c-contacts.component.html',
    styleUrl: './c-contacts.component.scss',
})
export class CContactsComponent {
    ELEMENT_DATA: PeriodicElement[] = [];

    page: number = 1;
    pageSize: number = 20;
    totalRecords: number = 0;
    contacts: any;
    school: any;
    selectedSchool: string = '';
        users: any;
            user_type: any;



    displayedColumns: string[] = [
        // 'select',
        'contactID',
        'name',
        'email',
        'phone',
        // 'courses',
        'owner',
        // 'lead_source',
        'status',
        'lead_status',
        'action',
    ];

    dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        // listen to paginator changes
        console.log('**********page changed**********');
        this.paginator.page.subscribe((event) => {
            this.page = event.pageIndex + 1; // MatPaginator is 0-based, API is 1-based
            this.pageSize = event.pageSize;
            this.getContactList();
        });
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

    filterCreatedDate(event: any) {
        // this.createdDateFilter = event.value;
        this.applyAllFilters();
    }

    filterDueDate(event: any) {
        // this.dueDateFilter = event.value;
        this.applyAllFilters();
    }

    filterPriority(event: any) {
        console.log('***event***', event);
    }

    filterSchool(event: any) {
        console.log('***event***', event.value);

        let params = new HttpParams();

        params = params.set('schoolId', event.value);
        this.getContactList(params);
    }

    filterUser(event: any) {
        console.log('***event***', event.value);

        let params = new HttpParams();

        params = params.set('userId', event.value);
        this.getContactList(params);
    }

    applyAllFilters() {
        this.dataSource.filter = '' + Math.random(); // Trigger table refresh
    }

    filterStatus(event: any) {
        // this.statusFilter = event.value;
        this.applyAllFilters();
    }

    resetFilters() {
        // this.createdDateFilter = null;
        // this.dueDateFilter = null;
        // this.priorityFilter = '';
        // this.statusFilter = '';
        this.applyAllFilters();
    }

    // applyFilter(event: Event) {
    //     const filterValue = (event.target as HTMLInputElement).value;
    //     console.log('filterValue => ???? ',filterValue.trim().toLowerCase())
    //     this.dataSource.filter = filterValue.trim().toLowerCase();
    // }

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
        // this.dataSource.filter = filterValue.trim().toLowerCase();

        let params = new HttpParams().set('search', filterValue);
        this.getContactList(params);
    }

    constructor(
        public themeService: CustomizerSettingsService,
        private contactService: ContactService,
        private toastr: ToastrService,
        private schoolService: SchoolService,
                private usersService: UsersService,
        
    ) {}

    ngOnInit(): void {
                this.user_type = localStorage.getItem('user_type');

        this.getContactList();
        this.getSchoolList();
                this.getUserList();

    }

        private getUserList(): void {
        let params = new HttpParams();

        params = params.set('user_type', 'USER');

        this.usersService.getUsers(this.page, params).subscribe({
            next: (response) => {
                if (response && response.success) {
                    this.users = response.data?.users || [];
                } else {
                    // this.toastr.error('Failed to load users', 'Failed');
                    console.error('Failed to load users:', response?.message);
                }
            },
            error: (error) => {
                console.error('API error:', error);
            },
        });
    }

    private getContactList(params?: any): void {
        this.contactService.getContact(this.page, params).subscribe({
            next: (response) => {
                if (response && response.success) {
                    const contacts = response.data?.contacts || [];
                    this.totalRecords = response.data?.total || contacts.length;

                    this.ELEMENT_DATA = contacts.map((u: any) => ({
                        id: u.id,
                        contactID: u.school || 'N/A',
                        owner: u?.contact_owner || 'N/A',

                        name: u.contact_name || 'N/A',
                        email: u.email || 'N/A',
                        // lead_source: u.lead_source || 'N/A',
                        lead_status: u.lead_status || 'OTHER',
                        phone: u.phone || '-',
                        courses: u?.courses,

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

    private getSchoolList(): void {
        let params = new HttpParams();

        params = params.set('status', true);

        this.schoolService.getSchool(this.page, params).subscribe({
            next: (response) => {
                if (response && response.success) {
                    this.school = response.data?.school || [];
                } else {
                    // this.toastr.error('Failed to load users', 'Failed');
                    console.error('Failed to load school:', response?.message);
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
    owner: string;
    // lead_source: string;
    status: any;
    lead_status: any;
    action: any;
}
