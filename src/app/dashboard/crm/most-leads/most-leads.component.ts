import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MostLeadsService } from './most-leads.service';

@Component({
    selector: 'app-most-leads',
    imports: [MatCardModule, MatMenuModule, MatButtonModule],
    templateUrl: './most-leads.component.html',
    styleUrl: './most-leads.component.scss'
})
export class MostLeadsComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private mostLeadsService: MostLeadsService
    ) {}

    ngOnInit(): void {
        this.mostLeadsService.loadChart();
    }

}