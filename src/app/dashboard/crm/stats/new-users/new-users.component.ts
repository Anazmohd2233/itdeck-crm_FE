import { Component } from '@angular/core';
import { NewUsersService } from './new-users.service';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-new-users',
    imports: [],
    templateUrl: './new-users.component.html',
    styleUrl: './new-users.component.scss'
})
export class NewUsersComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private newUsersService: NewUsersService
    ) {}

    ngOnInit(): void {
        this.newUsersService.loadChart();
    }

}