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
    ],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
})

export class UsersListComponent {
    page: number = 1;
    users: any;
    ELEMENT_DATA: PeriodicElement[] = [];

    displayedColumns: string[] = [
        'id',
        'name',
        'email',
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

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    constructor(
        public themeService: CustomizerSettingsService,
        private usersService: UsersService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.getUserList();
    }



    private getUserList(): void {
        this.usersService.getUsers(this.page).subscribe({
            next: (response) => {
                if (response && response.success) {
                    const users = response.data?.users || [];

                    this.ELEMENT_DATA = users.map((u: any) => ({
                        id: u.id || 'N/A',

                        name: u.name || 'N/A',
                        email: u.email || 'N/A',
                        type: u.user_type || 'N/A',

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
}

export interface PeriodicElement {
    id: any;
    name: string;
    email: any;
    phone: string;
    type: string;

    designation: string;
    status: string;
    action: any;
}
