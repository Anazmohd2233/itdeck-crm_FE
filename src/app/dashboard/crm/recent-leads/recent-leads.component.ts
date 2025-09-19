import { formatDate, NgFor, NgIf } from '@angular/common';
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
import { DashboardService } from '../../../services/dashboard.service';
import { RouterLink } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { SchoolService } from '../../../services/school.service';
import { UsersService } from '../../../services/users.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-recent-leads',
    imports: [
        RouterLink,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        NgIf,
        MatCheckboxModule,
        MatTooltipModule,
        NgFor,
        MatDatepickerModule,
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatNativeDateModule, // <-- required for Date adapter
        ReactiveFormsModule,
                MatIconModule,
          

    ],
    templateUrl: './recent-leads.component.html',
    styleUrl: './recent-leads.component.scss',
})
export class RecentLeadsComponent {
    ELEMENT_DATA: PeriodicElement[] = [];
    taskData: any;
    startDate: Date | null = null;
    endDate: Date | null = null;
    school: any;
    users: any;
    location: any;
    page: number = 1;
    pageSize: number = 20;
    totalRecords: number = 0;
        user_type: any;
        searchFieldSchool: string = '';
    searchFieldUser: string = '';
    searchFieldLocation: string = '';

    filterSchoolValue: any;
filterUserValue: any;
filterStatusValue: any;
filterLocationValue: any;
filterStartDate: any;
filterEndDate: any;


    displayedColumns: string[] = [
        'school_name',
        'location',
        'strength',
        'collected_data',
        'status',
        'assigned_user',
        'created_date',
        'due_date',
        'action',
    ];
    dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

        constructor(
        public themeService: CustomizerSettingsService,
        private dashboardService: DashboardService,
        private schoolService: SchoolService,
        private usersService: UsersService
    ) {}

    ngOnInit(): void {
                this.user_type = localStorage.getItem('user_type');

        this.getDashboardView();
              this.getSchoolList();
        this.getUserList();
        this.getLocationList();
    }

  ngAfterViewInit() {
        // listen to paginator changes
        console.log('**********page changed**********');
        this.paginator.page.subscribe((event) => {
            this.page = event.pageIndex + 1; // MatPaginator is 0-based, API is 1-based
            this.pageSize = event.pageSize;
        this.getDashboardView();
        });
    }

     searchSchool() {
        console.log('school search keyword', this.searchFieldSchool);
        this.getSchoolList(this.searchFieldSchool);
    }

    searchUser() {
        console.log('user search keyword', this.searchFieldUser);
        this.getUserList(this.searchFieldUser);
    }

    searchLocation() {
        console.log('location search keyword', this.searchFieldLocation);
        this.getLocationList(this.searchFieldLocation);
    }

    clearSearchUser() {
        this.searchFieldUser = ''; // Clear the input by setting the property to an empty string
        this.getUserList();
    }
    clearSearchSchool() {
        this.searchFieldSchool = ''; // Clear the input by setting the property to an empty string
        this.getSchoolList();
    }
    clearSearchLocation() {
        this.searchFieldLocation = ''; // Clear the input by setting the property to an empty string
        this.getLocationList();
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



    private getDashboardView(): void {

          let params = new HttpParams();

  if (this.filterSchoolValue) params = params.set('schoolId', this.filterSchoolValue);
  if (this.filterUserValue) params = params.set('userId', this.filterUserValue);
  if (this.filterStatusValue) params = params.set('taskStatus', this.filterStatusValue);
  if (this.filterLocationValue) params = params.set('location', this.filterLocationValue);
  if (this.filterStartDate) params = params.set('startDate', this.filterStartDate);
  if (this.filterEndDate) params = params.set('endDate', this.filterEndDate);
        this.dashboardService.getDashboardReport(this.page, params).subscribe({
            next: (response) => {
                if (response && response.success) {
                    const contacts = response.data?.tasks || [];
                    this.taskData = response.data?.total || contacts.length;
                                        this.totalRecords = response.data?.total || contacts.length;


                    this.ELEMENT_DATA = contacts.map((u: any) => ({
                        id: u.id,
                        school_name: u?.school_name || 'N/A',

                        location: u?.location?.name || 'N/A',

                        strength: u?.strength || 'N/A',
                        collected_data: u?.collected_data,
                        status: u?.status || 'N/A',
                        assigned_user: u?.assigned_user?.name || 'N/A',
                        created_date: u.created_at
                            ? new Date(u.created_at).toLocaleDateString()
                            : 'N/A',
                        due_date: u?.due_date || 'N/A',
                        action: {
                            view: 'visibility',
                        },
                    }));

                    this.dataSource.data = this.ELEMENT_DATA;
                } else {
                    console.error(
                        'Failed to load dashboard',
                        response?.message
                    );
                }
            },
            error: (error) => {
                console.error('API error:', error);
            },
        });
    }

  filterSchool(event: any) {
  this.filterSchoolValue = event.value;
  this.getDashboardView();
}

filterUser(event: any) {
  this.filterUserValue = event.value;
  this.getDashboardView();
}

filterStatus(event: any) {
  this.filterStatusValue = event.value;
  this.getDashboardView();
}

filterLocation(event: any) {
  this.filterLocationValue = event.value;
  this.getDashboardView();
}

filterDateRange() {
  if (this.startDate && this.endDate) {
    this.filterStartDate = this.startDate;
    this.filterEndDate = this.endDate;
    this.getDashboardView();
  }
}

    resetFilters() {
        this.startDate = null;
        this.endDate = null;
        //    this.locationFilter = null;
        this.getDashboardView();
    }

  private getSchoolList(search?: any): void {
        let params = new HttpParams().set('status', true);

        if (search) {
            params = params.set('search', search);
        }

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

    private getLocationList(search?: any): void {
        let params = new HttpParams().set('status', true);

        if (search) {
            params = params.set('search', search);
        }

        this.schoolService.getLocation(this.page, params).subscribe({
            next: (response) => {
                if (response && response.success) {
                    this.totalRecords = response.data?.total;

                    this.location = response.data?.location || [];
                } else {
                    // this.toastr.error('Failed to load users', 'Failed');
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
    school_name: any;
    location: any;
    strength: any;
    collected_data: any;
    status: any;
    assigned_user: any;
    created_date: any;
    due_date: any;

    action: any;
}
