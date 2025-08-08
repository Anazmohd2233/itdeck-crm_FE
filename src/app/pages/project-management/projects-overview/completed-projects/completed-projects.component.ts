import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-completed-projects',
    imports: [MatCardModule],
    templateUrl: './completed-projects.component.html',
    styleUrl: './completed-projects.component.scss'
})
export class CompletedProjectsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}