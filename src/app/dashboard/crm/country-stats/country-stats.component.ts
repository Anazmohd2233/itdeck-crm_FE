import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-country-stats',
    imports: [MatCardModule, MatMenuModule, MatButtonModule],
    templateUrl: './country-stats.component.html',
    styleUrl: './country-stats.component.scss'
})
export class CountryStatsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}