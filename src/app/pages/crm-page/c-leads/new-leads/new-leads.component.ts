import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { NewLeadsService } from './new-leads.service';

@Component({
    selector: 'app-new-leads',
    imports: [],
    templateUrl: './new-leads.component.html',
    styleUrl: './new-leads.component.scss'
})
export class NewLeadsComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private newLeadsService: NewLeadsService
    ) {}

    ngOnInit(): void {
        this.newLeadsService.loadChart();
    }

}