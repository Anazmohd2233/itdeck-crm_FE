import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { StatsComponent } from './stats/stats.component';
import { MostLeadsComponent } from './most-leads/most-leads.component';
import { CountryStatsComponent } from './country-stats/country-stats.component';
import { EarningReportsComponent } from './earning-reports/earning-reports.component';
import { TasksStatsComponent } from './tasks-stats/tasks-stats.component';
import { TopCustomersComponent } from './top-customers/top-customers.component';
import { RecentLeadsComponent } from './recent-leads/recent-leads.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ClientPaymentStatusComponent } from './client-payment-status/client-payment-status.component';
import { TotalLeadsComponent } from './total-leads/total-leads.component';
import { SalesOverviewComponent } from './sales-overview/sales-overview.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NewUsersComponent } from './stats/new-users/new-users.component';
import { ActiveUsersComponent } from './stats/active-users/active-users.component';
import { LeadConversationComponent } from './stats/lead-conversation/lead-conversation.component';
import { RevenueGrowthComponent } from './stats/revenue-growth/revenue-growth.component';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { DashboardService } from '../../services/dashboard.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HttpParams } from '@angular/common/http';
import { SchoolService } from '../../services/school.service';
import { UsersService } from '../../services/users.service';
import { formatDate, isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { SocketService } from '../../services/socket.service';
import { SharedService } from '../../services/sharedService';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-crm',
    imports: [
        StatsComponent,
        MostLeadsComponent,
        CountryStatsComponent,
        EarningReportsComponent,
        TasksStatsComponent,
        TopCustomersComponent,
        RecentLeadsComponent,
        ToDoListComponent,
        ClientPaymentStatusComponent,
        TotalLeadsComponent,
        SalesOverviewComponent,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        NewUsersComponent,
        ActiveUsersComponent,
        LeadConversationComponent,
        RevenueGrowthComponent,
        MatFormFieldModule,
        MatSelectModule,
        NgFor,
        FormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule, // <-- required for Date adapter
        ReactiveFormsModule,
        NgIf,
        MatIconModule,
    ],
    templateUrl: './crm.component.html',
    styleUrl: './crm.component.scss',
})
export class CrmComponent {
    dashboardData: any;
    school: any;
    users: any;
    location: any;
    page: number = 1;
    pageSize: number = 20;
    totalRecords: number = 0;
    startDate: Date | null = null;
    endDate: Date | null = null;
    locationFilter: string | null = null;
    user_type: any;
    searchFieldSchool: string = '';
    searchFieldUser: string = '';
    searchFieldLocation: string = '';
    profile: any;
  private destroy$ = new Subject<void>();

    private watchId: number | null = null;

    constructor(
        public themeService: CustomizerSettingsService,
        private dashboardService: DashboardService,
        private schoolService: SchoolService,
        private usersService: UsersService,
        private socketService: SocketService,
        @Inject(PLATFORM_ID) private platformId: Object,
        private sharedService: SharedService,
        private taskService: TaskService,
        private toastr: ToastrService,
                private authService: AuthService,
        
    ) {}

    ngOnInit(): void {
        this.user_type = localStorage.getItem('user_type');

        this.getProfile();

        this.getDashboardView();
        this.getSchoolList();
        this.getUserList();
        this.getLocationList();

         this.sharedService.checkIn$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.checkIn());

    this.sharedService.checkOut$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.checkOut());
    }

      ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

    private getProfile(): void {
        this.usersService.getProfile().subscribe({
            next: (response) => {
                if (response && response.success) {
                    this.profile = response.data || [];
                } else {
                    // this.toastr.error('Failed to load users', 'Failed');
                    console.error('Failed to load profile:', response?.message);
                }
            },
            error: (error) => {
                console.error('API error:', error);
            },
        });
    }

    checkIn(): void {
        const formData = new FormData();

        formData.append('user_id', this.profile?.id);
        this.taskService.createAttendence(formData).subscribe({
            next: (response) => {
                if (response.success) {
        this.getProfile();


                        this.toastr.success(
                            'Checkined successfully',
                            'Success'
                        );
                    console.log('Checkined successfully:', response);
                } else {
                    this.toastr.error(
                        response.message || 'Failed to Checkin.',
                        'Error'
                    );
                    console.error('❌ add failed:', response.message);
                }
            },
            error: (error) => {
                console.error('Error checkin', error);

                // You can add other error handling/notification here
            },
        });

        console.log('CheckIn from Dashboard');
        console.log('this.profile?.id', this.profile?.id);

        if (isPlatformBrowser(this.platformId) && 'geolocation' in navigator) {
            this.watchId = navigator.geolocation.watchPosition(
                (pos) => {
                    console.log(
                        '📍',
                        pos.coords.latitude,
                        pos.coords.longitude
                    );
                    this.socketService.startTracking(this.profile?.id); // pass logged-in userId
                },
                (err) => console.error('❌ Location error:', err),
                { enableHighAccuracy: true }
            );
        } else {
            console.log('********else working for checkin**********');
        }
    }

    checkOut(): void {
        const formData = new FormData();

        formData.append('user_id', this.profile?.id);
        this.taskService.updateAttendence(formData).subscribe({
            next: (response) => {
                if (response.success) {
                     this.toastr.success(
                            'Checkout successfully',
                            'Success'
                        );
        this.getProfile();
                    console.log('Checkout successfully:', response);
                } else {
                    this.toastr.error(
                        response.message || 'Failed to Checkout.',
                        'Error'
                    );
                    console.error('❌ add failed:', response.message);
                }
            },
            error: (error) => {
                console.error('Error Checkout', error);

                // You can add other error handling/notification here
            },
        });

        console.log('CheckOut from Dashboard');
        console.log('this.profile?.id', this.profile?.id);

        if (isPlatformBrowser(this.platformId) && this.watchId !== null) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
            this.socketService.stopTracking(this.profile?.id); // pass logged-in userId
        } else {
            console.log('********else working for checkout**********');
        }
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

    private getDashboardView(params?: any): void {
        this.dashboardService.getDashboardSummary(params).subscribe({
            next: (response) => {
                if (response && response.success) {
                    this.dashboardData = response.data || [];
                    console.log('response.data ', response.data);
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
        console.log('***event***', event.value);

        let params = new HttpParams();

        params = params.set('schoolId', event.value);

        this.getDashboardView(params);
    }

    filterUser(event: any) {
        console.log('***event***', event.value);

        let params = new HttpParams();

        params = params.set('userId', event.value);
        this.getDashboardView(params);
    }

    filterStatus(event: any) {
        console.log('***event***', event.value);

        let params = new HttpParams();

        params = params.set('taskStatus', event.value);

        this.getDashboardView(params);
    }
    filterLocation(event: any) {
        console.log('***event***', event.value);

        let params = new HttpParams();

        params = params.set('location', event.value);

        this.getDashboardView(params);
    }
    filterDateRange() {
        if (this.startDate && this.endDate) {
            const formattedStart = formatDate(
                this.startDate,
                'yyyy-MM-dd',
                'en-US'
            );
            const formattedEnd = formatDate(
                this.endDate,
                'yyyy-MM-dd',
                'en-US'
            );

            console.log('formattedStart', formattedStart);
            console.log('formattedEnd', formattedEnd);

            const params = new HttpParams()
                .set('startDate', formattedStart)
                .set('endDate', formattedEnd);

            this.getDashboardView(params);
        }
    }

    resetFilters() {
        this.startDate = null;
        this.endDate = null;
        //    this.locationFilter = null;
        this.getDashboardView();
    }
}
