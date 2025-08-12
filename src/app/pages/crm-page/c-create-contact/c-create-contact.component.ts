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
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { ContactService } from '../../../services/contact.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-c-create-contact',
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
        CommonModule,
    ],
    templateUrl: './c-create-contact.component.html',
    styleUrl: './c-create-contact.component.scss',
})
export class CCreateContactComponent {
    contactForm!: FormGroup;
    isSubmitting = false;

    selectedFile: File | null = null;

    // File Uploader
    public multiple: boolean = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private contactService: ContactService
    ) {}

    ngOnInit(): void {
        this.initializeContactForm();
    }

    initializeContactForm() {
        this.contactForm = this.fb.group({
            contact_id: ['', Validators.required],
            contact_name: ['', Validators.required],
            email: [''],
            phone: ['', Validators.required],
            courses: [''],
            status: ['', Validators.required],
            lead_source: ['', Validators.required],
        });
    }

    onFileSelect(event: any) {
        this.selectedFile = event.target.files[0];
    }

    createContact(): void {
        console.log('workiongggggggggggg*******');
        Object.keys(this.contactForm.controls).forEach((key) => {
            console.log(key, this.contactForm.get(key)?.value);
        });
        if (this.contactForm.invalid) {
            console.log('********contact form not vlaid*******');

            this.contactForm.markAllAsTouched();
            return;
        }
        this.isSubmitting = true;

        const formData = new FormData();
        Object.keys(this.contactForm.controls).forEach((key) => {
            formData.append(key, this.contactForm.get(key)?.value);
        });

        if (this.selectedFile) {
            formData.append('contact_img', this.selectedFile);
        }

        this.contactService.createContact(formData).subscribe({
            next: (response) => {
                if (response.success) {
                    this.isSubmitting = false;
                    this.contactForm.reset();
                    this.toastr.success(
                        'Contact Added successfully',
                        'Success'
                    );
                    console.log('✅ Contact Added successfully');
                } else {
                    this.isSubmitting = false;

                    this.toastr.error(
                        response.message || 'Failed to Add Contact.',
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
