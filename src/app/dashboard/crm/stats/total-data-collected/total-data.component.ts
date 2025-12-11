import { Component, Input } from '@angular/core';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'total-data-collected',
    imports: [],
    templateUrl: './total-data.component.html',
    styleUrl: './total-data.component.scss'
})
export class TotalDataCollectedComponent {

    @Input() data: any;


    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}
