import { Component, Input } from '@angular/core';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-revenue-growth',
    imports: [],
    templateUrl: './revenue-growth.component.html',
    styleUrl: './revenue-growth.component.scss'
})
export class RevenueGrowthComponent {

    @Input() data: any;


    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}
