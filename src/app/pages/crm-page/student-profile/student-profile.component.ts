import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { TotalProjectsComponent } from './total-projects/total-projects.component';
import { TotalRevenueComponent } from './total-revenue/total-revenue.component';
import { TotalOrdersComponent } from './total-orders/total-orders.component';
import { ProfileIntroComponent } from './profile-intro/profile-intro.component';
import { ProfileInformationComponent } from './profile-information/profile-information.component';
import { AdditionalInformationComponent } from './additional-information/additional-information.component';
import { OverviewComponent } from './overview/overview.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';

@Component({
  selector: 'app-student-profile',
  imports: [RouterLink, WelcomeComponent, TotalProjectsComponent, TotalOrdersComponent, TotalRevenueComponent, ProfileIntroComponent, ProfileInformationComponent, AdditionalInformationComponent, OverviewComponent, ToDoListComponent, RecentActivityComponent],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.scss'
})
export class StudentProfileComponent {

}
