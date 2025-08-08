import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-change-password',
    imports: [RouterLink, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

    // Password Hide
    hide = true;
    hide2 = true;
    hide3 = true;

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}