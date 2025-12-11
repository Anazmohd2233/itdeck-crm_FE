import { Component, Input } from '@angular/core';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-new-users',
    imports: [],
    templateUrl: './new-users.component.html',
    styleUrl: './new-users.component.scss'
})
export class NewUsersComponent {

    @Input() data: any;


    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}
