import { Component } from '@angular/core';
import { ActiveUsersService } from './active-users.service';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-active-users',
    imports: [],
    templateUrl: './active-users.component.html',
    styleUrl: './active-users.component.scss'
})
export class ActiveUsersComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private activeUsersService: ActiveUsersService
    ) {}

    ngOnInit(): void {
        this.activeUsersService.loadChart();
    }

}