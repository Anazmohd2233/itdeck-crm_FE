import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { RevenueGrowthService } from './revenue-growth.service';

@Component({
    selector: 'app-revenue-growth:not(p)',
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