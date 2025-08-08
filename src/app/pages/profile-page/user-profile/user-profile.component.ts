import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-user-profile',
    imports: [MatCardModule, MatButtonModule, MatMenuModule, AllProjectsComponent, RecentActivityComponent],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}