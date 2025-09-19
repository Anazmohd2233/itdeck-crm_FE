import { formatDate, NgFor, NgIf } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { TicketsOpenComponent } from '../../../dashboard/help-desk/tickets-open/tickets-open.component';
import { TicketsInProgressComponent } from '../../../dashboard/help-desk/tickets-in-progress/tickets-in-progress.component';
import { TicketsResolvedComponent } from '../../../dashboard/help-desk/tickets-resolved/tickets-resolved.component';
import { TicketsClosedComponent } from '../../../dashboard/help-desk/tickets-closed/tickets-closed.component';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskService } from '../../../services/task.service';
import { HttpParams } from '@angular/common/http';
import { SchoolService } from '../../../services/school.service';
import { UsersService } from '../../../services/users.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Division } from '../../../services/enums';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-hd-tickets',
    imports: [
        RouterLink,
        TicketsOpenComponent,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        TicketsInProgressComponent,
        TicketsResolvedComponent,
        TicketsClosedComponent,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        NgIf,
        MatTooltipModule,
        MatProgressBarModule,
        NgFor,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
    ],

    templateUrl: './hd-tickets.component.html',
    styleUrls: ['./hd-tickets.component.scss'],
})
export class HdTicketsComponent implements OnInit {
    displayedColumns: string[] = [
        'ticketID',
        // 'title',
        'school',
        // 'district',

        'location',

        'division',
        'priority',
        'user',
        'createdDate',
        'dueDate',
        'status',

        'action',
    ];
    dataSource = new MatTableDataSource<TaskElement>();
    isLoading = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    createdDateFilter: Date | null = null;
    dueDateFilter: Date | null = null;
    priorityFilter: string = '';
    statusFilter: string = '';
    page: number = 1;
    pageSize: number = 20;
    totalRecords: number = 0;
    school: any;
    users: any;
    user_type: any;
    divisions = Object.values(Division);
    searchFieldSchool: string = '';
    searchFieldUser: string = '';
    searchFieldLocation: string = '';
    location: any;

    filterCreatedDateValue: any;
    filterDueDateValue: any;
    filterSchoolValue: any;
    filterDivisionValue: any;
    filterUserValue: any;
    filterLocationValue: any;
    filterStatusValue: any;

    constructor(
        public themeService: CustomizerSettingsService,
        private taskService: TaskService,
        private router: Router,
        private schoolService: SchoolService,
        private usersService: UsersService
    ) {}

    ngOnInit(): void {
        this.user_type = localStorage.getItem('user_type');

        this.loadTasks();
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
            this.loadTasks();
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

    loadTasks(): void {
        let params = new HttpParams();

        if (this.filterCreatedDateValue)
            params = params.set('createdDate', this.filterCreatedDateValue);
        if (this.filterDueDateValue)
            params = params.set('dueDate', this.filterDueDateValue);
        if (this.filterSchoolValue)
            params = params.set('schoolId', this.filterSchoolValue);
        if (this.filterDivisionValue)
            params = params.set('division', this.filterDivisionValue);
        if (this.filterUserValue)
            params = params.set('userId', this.filterUserValue);
        if (this.filterLocationValue)
            params = params.set('location', this.filterLocationValue);
        if (this.filterStatusValue)
            params = params.set('status', this.filterStatusValue);
        this.isLoading = true;
        this.taskService.getTasks(this.page, params).subscribe({
            next: (response: any) => {
                this.totalRecords = response.data?.total;

                // Map API response to TaskElement format
                const tasks =
                    response.data?.tasks?.map((task: any) =>
                        this.mapApiTaskToElement(task)
                    ) || [];
                this.dataSource.data = tasks;
                this.dataSource.filterPredicate = this.customFilterPredicate();
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading tasks:', error);
                console.error('Error details:', error.error);
                console.error('Error status:', error.status);
                console.error('Error URL:', error.url);
                this.isLoading = false;
                // Fallback to mock data for now
                // this.dataSource.data = ELEMENT_DATA;
                this.dataSource.filterPredicate = this.customFilterPredicate();
            },
        });
    }

    private mapApiTaskToElement(task: any): TaskElement {
        // Use placeholder image service for missing images
        const defaultAvatar =
            'https://via.placeholder.com/40x40/007bff/ffffff?text=U';

        return {
            id: task.id,
            ticketID: `#${task.id || 'N/A'}`,
            // title: task.task_title || 'No Title',
            // type: task.task_type,
            createdDate: task.createdAt
                ? new Date(task.createdAt).toLocaleDateString()
                : 'N/A',
            dueDate: task.due_date
                ? new Date(task.due_date).toLocaleDateString()
                : 'N/A',
            priority: task.priority || 'Medium',
            division: task?.division || 'N/A',

            location: task?.school?.location?.name || 'N/A',
            district: task?.district || 'N/A',

            user: task?.assigned_to?.name || 'N/A',
            school: task?.school?.school_name || 'N/A',

            status: task.status,
            action: {
                view: 'visibility',
                delete: 'delete',
            },
        };
    }

    filterCreatedDate(event: any) {
        if (event.value) {
            this.filterCreatedDateValue = formatDate(
                event.value,
                'yyyy-MM-dd',
                'en-US'
            );
            this.loadTasks();
        }
    }

    filterDueDate(event: any) {
        if (event.value) {
            this.filterDueDateValue = formatDate(
                event.value,
                'yyyy-MM-dd',
                'en-US'
            );
            this.loadTasks();
        }
    }

    filterSchool(event: any) {
        this.filterSchoolValue = event.value;
        this.loadTasks();
    }

    filterDivision(event: any) {
        this.filterDivisionValue = event.value;
        this.loadTasks();
    }

    filterUser(event: any) {
        this.filterUserValue = event.value;
        this.loadTasks();
    }

    filterLocation(event: any) {
        this.filterLocationValue = event.value;
        this.loadTasks();
    }

    filterStatus(event: any) {
        this.filterStatusValue = event.value;
        this.loadTasks();
    }

    searchLocation() {
        console.log('location search keyword', this.searchFieldLocation);
        this.getLocationList(this.searchFieldLocation);
    }
    clearSearchLocation() {
        this.searchFieldLocation = ''; // Clear the input by setting the property to an empty string
        this.loadTasks();
    }

    customFilterPredicate() {
        return (data: TaskElement, filter: string): boolean => {
            let matchesCreatedDate = true;
            let matchesDueDate = true;
            let matchesPriority = true;
            let matchesStatus = true;

            if (this.createdDateFilter) {
                matchesCreatedDate =
                    new Date(data.createdDate).toDateString() ===
                    this.createdDateFilter.toDateString();
            }

            if (this.dueDateFilter) {
                matchesDueDate =
                    new Date(data.dueDate).toDateString() ===
                    this.dueDateFilter.toDateString();
            }

            if (this.priorityFilter) {
                matchesPriority = data.priority === this.priorityFilter;
            }

            if (this.statusFilter) {
                // Check data.status object
                matchesStatus = Object.values(data.status).includes(
                    this.statusFilter
                );
            }

            return (
                matchesCreatedDate &&
                matchesDueDate &&
                matchesPriority &&
                matchesStatus
            );
        };
    }

    resetFilters() {
        this.createdDateFilter = null;
        this.dueDateFilter = null;

        this.filterCreatedDateValue = null;
        this.filterDueDateValue = null;

        this.loadTasks();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        console.log('filterValue => ???? ', filterValue.trim().toLowerCase());
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    viewTask(ticketId: string): void {
        // Extract numeric ID from ticketId (remove # prefix)
        const taskId = ticketId.replace('#', '');
        console.log('Viewing task:', taskId);
        // Navigate to task details page
        this.router.navigate(['/task/ticket-details', taskId]);
    }

    editTask(ticketId: string): void {
        // Extract numeric ID from ticketId (remove # prefix)
        const taskId = ticketId.replace('#', '');
        console.log('Editing task:', taskId);
        // Navigate to task edit page
        this.router.navigate(['/task/edit-ticket', taskId]);
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
    searchSchool() {
        console.log('school search keyword', this.searchFieldSchool);
        this.getSchoolList(this.searchFieldSchool);
    }

    searchUser() {
        console.log('user search keyword', this.searchFieldUser);
        this.getUserList(this.searchFieldUser);
    }

    clearSearchUser() {
        this.searchFieldUser = ''; // Clear the input by setting the property to an empty string
        this.getUserList();
    }
    clearSearchSchool() {
        this.searchFieldSchool = ''; // Clear the input by setting the property to an empty string
        this.getSchoolList();
    }
}

export interface TaskElement {
    id: any;
    ticketID: string;
    // title: string;
    school: any;
    location: any;

    district: any;

    division: any;
    priority: string;
    user: any;
    createdDate: string;
    dueDate: string;
    status: any;
    action: any;
}
