import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-profile-intro',
    imports: [MatCardModule, MatButtonModule, MatMenuModule, RouterLink],
    templateUrl: './profile-intro.component.html',
    styleUrl: './profile-intro.component.scss'
})
export class ProfileIntroComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}