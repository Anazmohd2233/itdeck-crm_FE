import { NgIf } from '@angular/common';
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
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-c-edit-lead',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, FileUploadModule, NgIf],
    templateUrl: './c-edit-lead.component.html',
    styleUrl: './c-edit-lead.component.scss'
})
export class CEditLeadComponent {

    // File Uploader
    public multiple: boolean = false;
    taskCreated: boolean = false;

    // Select Value
    leadSourceSelected = 'option1';
    statusSelected = 'option1';
    dataLead: string = 'Edit';
    constructor(private route: ActivatedRoute, private toastr: ToastrService) {}


    ngOnInit(): void {
        const data = this.route.snapshot.paramMap.get('data');
        if (data) {
            this.dataLead = data;
        } else {
            this.dataLead = 'Edit'
        }
    }

    createTask() {
        this.taskCreated = true;

        this.toastr.success('Task Created successfully!', 'Success');
    }

}