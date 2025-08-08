import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { DatePipe } from '@angular/common';
import { WelcomeService } from './welcome.service';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-welcome:not(p)',
    imports: [MatCardModule, MatMenuModule, MatButtonModule],
    templateUrl: './welcome.component.html',
    styleUrl: './welcome.component.scss',
    providers: [DatePipe]
})
export class WelcomeComponent {

    currentDate: any;

    constructor(
        private datePipe: DatePipe,
        public themeService: CustomizerSettingsService,
        private welcomeService: WelcomeService
    ) {}

    ngOnInit(): void {
        this.welcomeService.loadChart();
    }

}