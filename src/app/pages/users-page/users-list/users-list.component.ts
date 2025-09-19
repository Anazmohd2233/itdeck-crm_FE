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
import { UsersService } from '../../../services/users.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-users-list',
    imports: [
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatSelectModule,
        NgFor,
        FormsModule, // ✅ needed for [(ngModel)]
        MatIconModule,
        NgIf,
        MatFormFieldModule,
        
    MatInputModule,
             // for mat-icon-button
    ],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
    page: number = 1;
    users: any;
    ELEMENT_DATA: PeriodicElement[] = [];
    searchField: string = ''; // Initialize the property

    displayedColumns: string[] = [
        'id',
        'name',
        'school_type',
        'location',
        'phone',
        'designation',
        'type',
        'status',
        'action',
    ];
    dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter() {
        // const filterValue = (event.target as HTMLInputElement).value;
        // this.dataSource.filter = filterValue.trim().toLowerCase();

        let params = new HttpParams().set('search', this.searchField);
        this.getUserList(params);
    }

    applySearch(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        // this.dataSource.filter = filterValue.trim().toLowerCase();

        let params = new HttpParams().set('search', filterValue);
        this.getUserList(params);
    }

    constructor(
        public themeService: CustomizerSettingsService,
        private usersService: UsersService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.getUserList();
    }

    private getUserList(params?: any): void {
        this.usersService.getUsers(this.page, params).subscribe({
            next: (response) => {
                if (response && response.success) {
                    const users = response.data?.users || [];

                    this.ELEMENT_DATA = users.map((u: any) => ({
                        id: u.id || 'N/A',
                        school_type: u.school_type || 'N/A',
                        name: u.name || 'N/A',
                        email: u.email || 'N/A',
                        type: u.user_type || 'N/A',
                        location: u?.location?.name,

                        phone: u.phone || '-',
                        designation: u.designation || '-',
                        status: u.status ? 'Active' : 'Inactive',
                        action: '', // we will handle icons directly in template
                    }));

                    this.dataSource.data = this.ELEMENT_DATA;
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

    clearSearch() {
                this.searchField = ''; // Clear the input by setting the property to an empty string

        this.getUserList();

    }
}

export interface PeriodicElement {
    id: any;
    name: string;
    location: any;
    phone: string;
    type: string;
    school_type: any;
    designation: string;
    status: string;
    action: any;
}
