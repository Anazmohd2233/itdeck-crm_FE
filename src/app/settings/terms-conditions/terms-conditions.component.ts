import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-terms-conditions',
    imports: [MatButtonModule],
    templateUrl: './terms-conditions.component.html',
    styleUrl: './terms-conditions.component.scss'
})
export class TermsConditionsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}