import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { ActiveLeadsService } from './active-leads.service';

@Component({
    selector: 'app-active-leads',
    imports: [],
    templateUrl: './active-leads.component.html',
    styleUrl: './active-leads.component.scss'
})
export class ActiveLeadsComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private activeLeadsService: ActiveLeadsService
    ) {}

    ngOnInit(): void {
        this.activeLeadsService.loadChart();
    }

}