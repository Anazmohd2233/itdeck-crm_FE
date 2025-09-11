import { Component } from '@angular/core';
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
import { formatDate, NgFor } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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

    private getLocationList(): void {
        let params = new HttpParams();

        params = params.set('status', true);

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
