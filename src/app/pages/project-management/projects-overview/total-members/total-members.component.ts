import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-total-members',
    imports: [MatCardModule],
    templateUrl: './total-members.component.html',
    styleUrl: './total-members.component.scss'
})
export class TotalMembersComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}