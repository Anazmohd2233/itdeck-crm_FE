import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-c-create-lead',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, FileUploadModule, NgIf],
    templateUrl: './c-create-lead.component.html',
    styleUrl: './c-create-lead.component.scss'
})
export class CCreateLeadComponent {

    // File Uploader
    public multiple: boolean = false;
    taskCreated: boolean = false;

    constructor(
        public themeService: CustomizerSettingsService, private route: ActivatedRoute, private toastr: ToastrService
    ) {}

    
    createTask() {
        this.taskCreated = true;

        this.toastr.success('Task Created successfully!', 'Success');
    }

}