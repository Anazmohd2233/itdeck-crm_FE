import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-pm-teams',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatProgressBarModule],
    templateUrl: './pm-teams.component.html',
    styleUrl: './pm-teams.component.scss'
})
export class PmTeamsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}