import { formatDate, NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../services/student.services';
import { environment } from '../../../environments/environment';
import { SchoolService } from '../../services/school.service';
import { HttpParams } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { TaskService } from '../../services/task.service';
import { UsersService } from '../../services/users.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
    selector: 'app-user-location',
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
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
        FormsModule, // ✅ needed for [(ngModel)]
        MatSelectModule,
        NgFor,
        GoogleMapsModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    templateUrl: './students.component.html',
    styleUrl: './students.component.scss',
})
export class UserLocationComponent {
    ELEMENT_DATA: PeriodicElement[] = [];

    page: number = 1;
    pageSize: number = 20;
    totalRecords: number = 0;
    students: any;
    searchField: string = ''; // Initialize the property
    searchFieldLocation: string = '';
    location: any;
    liveLocation: any;
    filterUserValue: any;
    filterDateValue: any;
    profile: any;
    createdDateFilter: Date | null = null;
    users: any;
    searchFieldUser: string = '';
    user_type: any;

    @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

    zoom = 14;
    center: google.maps.LatLngLiteral = { lat: 11.259007, lng: 75.792014 }; // default
    markers: any[] = [];
    path: google.maps.LatLngLiteral[] = [];
    displayedColumns: string[] = [
        // 'select',

        'school_name',
        'location',
        'type',
        'strength',
        'status',
        'action',
    ];
    dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        public themeService: CustomizerSettingsService,
        private snackBar: MatSnackBar,
        private toastr: ToastrService,
        private schoolService: SchoolService,
        private taskService: TaskService,
        private usersService: UsersService,

        private router: Router
    ) {}

    ngOnInit(): void {
        this.user_type = localStorage.getItem('user_type');

        this.getUserList();
        this.getLiveLocation();
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
            row.school_name + 1
        }`;
    }
    private getUserList(search?: any): void {
        let params = new HttpParams().set('user_type', 'USER');

        if (search) {
            params = params.set('search', search);
        }

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

    searchUser() {
        console.log('user search keyword', this.searchFieldUser);
        this.getUserList(this.searchFieldUser);
    }

    clearSearchUser() {
        this.searchFieldUser = ''; // Clear the input by setting the property to an empty string
        this.getUserList();
    }

    resetFilters() {
        // this.filterUserValue = null;
        this.filterDateValue = null;
        this.createdDateFilter = null;
        this.getLiveLocation();
    }
    clearSearch() {
        this.searchField = ''; // Clear the input by setting the property to an empty string
    }

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    copyToClipboard(input: HTMLInputElement) {
        input.select();
        document.execCommand('copy');
        this.snackBar.open('Link copied to clipboard!', 'Close', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }

    filterCreatedDate(event: any) {
        if (event.value) {
            const formattedDate = formatDate(
                event.value,
                'yyyy-MM-dd',
                'en-US'
            );
            this.filterDateValue = formattedDate;

            this.getLiveLocation();
        }
    }

    filterUser(event: any) {
        console.log('***event***', event.value);

        this.filterUserValue = event.value;
        this.getLiveLocation();
    }

    private getLiveLocation(): void {
                let params = new HttpParams();
               
                if(this.filterUserValue){
                            params = params.set('userId', this.filterUserValue);

                }
                if(this.filterDateValue){
                            params = params.set('date', this.filterDateValue);

                }

        this.taskService.getLiveLocation(params).subscribe({
            next: (response) => {
                if (response && response.success) {
                    this.liveLocation = response.data?.locations || [];

                    // 👉 Convert liveLocation into map markers + path
                    this.markers = this.liveLocation.map(
                        (loc: any, index: number) => ({
                            position: {
                                lat: +loc.live_latitude,
                                lng: +loc.live_longitude,
                            },
                            title: `${new Date(
                                loc.createdAt
                            ).toLocaleTimeString()}`,
                        })
                    );

                    this.path = this.liveLocation.map((loc: any) => ({
                        lat: +loc.live_latitude,
                        lng: +loc.live_longitude,
                    }));

                    // Center on the first point if available
                    if (this.path.length > 0) {
                        this.center = this.path[0];
                    }
                } else {
                    console.error(
                        'Failed to load location:',
                        response?.message
                    );
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
    school_name: any;
    location: any;
    type: any;
    strength: any;
    status: any;
    action: any;
}
