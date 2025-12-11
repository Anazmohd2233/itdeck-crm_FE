import { Component, Input } from '@angular/core';
import { TotalDataCollectedService } from './total-data.service';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'total-data-collected',
    imports: [],
    templateUrl: './total-data.component.html',
    styleUrl: './total-data.component.scss'
})
export class TotalDataCollectedComponent {

        @Input() data: any;
        @Input() chartId = 'crm_total_data_collected_chart';


    constructor(
        public themeService: CustomizerSettingsService,
        private totalDataCollectedService: TotalDataCollectedService
    ) {}

    ngOnInit(): void {
        this.totalDataCollectedService.loadChart(this.chartId);
    }

}
