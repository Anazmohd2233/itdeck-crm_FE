import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-account-settings',
    imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, FileUploadModule],
    templateUrl: './account-settings.component.html',
    styleUrl: './account-settings.component.scss'
})
export class AccountSettingsComponent {

    // Select Value
    genderSelected = 'option1';

    // File Uploader
    public multiple: boolean = false;

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}