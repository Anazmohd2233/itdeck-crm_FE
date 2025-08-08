import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-active-projects',
    imports: [MatCardModule],
    templateUrl: './active-projects.component.html',
    styleUrl: './active-projects.component.scss'
})
export class ActiveProjectsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}