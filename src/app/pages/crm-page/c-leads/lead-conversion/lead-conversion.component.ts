import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { LeadConversionService } from './lead-conversion.service';

@Component({
    selector: 'app-lead-conversion',
    imports: [],
    templateUrl: './lead-conversion.component.html',
    styleUrl: './lead-conversion.component.scss'
})
export class LeadConversionComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private leadConversionService: LeadConversionService
    ) {}

    ngOnInit(): void {
        this.leadConversionService.loadChart();
    }

}