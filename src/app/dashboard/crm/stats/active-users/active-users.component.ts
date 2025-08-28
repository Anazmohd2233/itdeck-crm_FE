import { Component, Input } from '@angular/core';
import { ActiveUsersService } from './active-users.service';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-active-users',
    imports: [],
    templateUrl: './active-users.component.html',
    styleUrl: './active-users.component.scss'
})
export class ActiveUsersComponent {

        @Input() data: any;


    constructor(
        public themeService: CustomizerSettingsService,
        private activeUsersService: ActiveUsersService
    ) {}

    ngOnInit(): void {
        this.activeUsersService.loadChart();
    }

}