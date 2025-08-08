import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-total-projects',
    imports: [MatCardModule],
    templateUrl: './total-projects.component.html',
    styleUrl: './total-projects.component.scss'
})
export class TotalProjectsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}