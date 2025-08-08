import { Component } from '@angular/core';
import { RevenueGrowthService } from './revenue-growth.service';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-revenue-growth',
    imports: [],
    templateUrl: './revenue-growth.component.html',
    styleUrl: './revenue-growth.component.scss'
})
export class RevenueGrowthComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private revenueGrowthService: RevenueGrowthService
    ) {}

    ngOnInit(): void {
        this.revenueGrowthService.loadChart();
    }

}