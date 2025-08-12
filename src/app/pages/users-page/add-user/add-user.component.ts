import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-add-user',
    imports: [
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        FileUploadModule,
        MatRadioModule,
        MatCheckboxModule,
        CommonModule,
    ],
    templateUrl: './add-user.component.html',
    styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
    userForm!: FormGroup;
    selectedFile: File | null = null;
    isSubmitting = false;

    // File Uploader
    public multiple: boolean = false;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        public themeService: CustomizerSettingsService,
        private usersService: UsersService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.initializeUserForm();
    }

    initializeUserForm() {
        this.userForm = this.fb.group({
            user_name: ['', Validators.required],
            name: [''],
            email: [''],
            phone: [''],
            designation: [''],
            status: ['', Validators.required],
            password: ['', Validators.required],
            user_type: ['', Validators.required],
        });
    }

    onFileSelect(event: any) {
        this.selectedFile = event.target.files[0];
    }

    createUser(): void {
        if (this.userForm.invalid) {
            this.userForm.markAllAsTouched();
            return;
        }
        this.isSubmitting = true;

        const formData = new FormData();
        Object.keys(this.userForm.controls).forEach((key) => {
            formData.append(key, this.userForm.get(key)?.value);
        });

        if (this.selectedFile) {
            formData.append('file', this.selectedFile);
        }

        const formValue = this.userForm.getRawValue(); // ✅ fix here
        formData.append(
            'is_super_admin',
            formValue.user_type === 'admin' ? 'true' : 'false'
        );

        this.usersService.createUser(formData).subscribe({
            next: (response) => {
                if (response.success) {
                    this.isSubmitting = false;
                    this.userForm.reset();
                    this.toastr.success('User Added successfully', 'Success');
                    console.log('✅ User Added successfully');
                } else {
                    this.isSubmitting = false;

                    this.toastr.error(
                        response.message || 'Failed to Add Service.',
                        'Error'
                    );
                    console.error('❌ add failed:', response.message);
                }
            },
            error: (error) => {
                this.isSubmitting = false;

                this.toastr.error('Something went wrong.', 'Error');

                console.error('❌ API error:', error);
            },
        });
    }
}
