import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
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
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { StudentService } from '../../services/student.services';
import { Router } from 'express';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-student-reg-form',
    imports: [
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        FileUploadModule,
        NgxEditorModule,
        NgIf,
        CommonModule,
    ],
    templateUrl: './student-reg-form.component.html',
    styleUrl: './student-reg-form.component.scss',
})
export class StudentRegFormComponent {
    studentForm!: FormGroup;
    studentImage: File | null = null;
    idProof: File | null = null;
    certificate: File | null = null;
    isSubmitting = false;

    option: string[] = ['option2'];
    // File Uploader
    public multiple: boolean = false;

    // Select Value
    contactStatusSelected = 'option1';

    // Text Editor
    editor!: Editor; // Make it nullable
    toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];

    ngOnInit(): void {
        this.initializeForm();
        if (isPlatformBrowser(this.platformId)) {
            // Initialize the editor only in the browser
            this.editor = new Editor();
        }
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId) && this.editor) {
            this.editor.destroy();
        }
    }

    // File Uploader
    // public multiple: boolean = false;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        public themeService: CustomizerSettingsService,
        private fb: FormBuilder,
        private studentService: StudentService,
        private toastr: ToastrService
    ) {}
    private initializeForm(): void {
        this.studentForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            phone: ['', Validators.required],
            whatsappNumber: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            gender: ['', Validators.required],
            maritalStatus: [''],
            dob: ['', Validators.required],
            residenceCountry: ['', Validators.required],
            address: [''],
            nationality: ['', Validators.required],
            qualification: [''],
            orgName: ['', Validators.required],
            jobTitle: [''],
            visaStatus: [''],
            status: ['', Validators.required],
            emirates: ['', Validators.required],
        });
    }

    onSubmit(): void {
        if (this.studentForm.valid) {
            console.log('✅ Form Submitted:', this.studentForm.value);

            const formData = new FormData();

            Object.keys(this.studentForm.controls).forEach((key) => {
                formData.append(key, this.studentForm.get(key)?.value);
            });

            if (this.studentImage)
                formData.append('studentImage', this.studentImage);

            if (this.idProof) formData.append('idProof', this.idProof);

            if (this.certificate)
                formData.append('certificate', this.certificate);

            this.studentService.createContactPublic(formData).subscribe({
                next: (response) => {
                    if (response && response.success) {
                        this.studentForm.reset();
                        this.certificate = null;
                        this.studentImage = null;
                        this.idProof = null;
                        this.toastr.success('Created successfully', 'Success');
                    } else {
                        this.toastr.error('Failed to Create student', 'Error');
                    }
                    this.isSubmitting = false;
                },
                error: (error) => {
                    console.error('Error Creating student:', error);
                    this.toastr.error('Error Creating student', 'Error');
                    this.isSubmitting = false;
                },
            });
        } else {
            console.log('❌ Invalid Form');
            this.studentForm.markAllAsTouched();
        }
    }
    onFileSelected(event: any, type: string) {
        console.log('📂 File Upload Event:', event);

        let file: File | null = null;

        if (event instanceof File) {
            file = event; // case: emits single File
        } else if (Array.isArray(event)) {
            file = event[0]; // case: emits array of Files
        } else if (event?.file) {
            file = event.file; // case: emits { file: File, ... }
        } else if (event?.target?.files?.length) {
            file = event.target.files[0]; // fallback: native input
        }

        if (file) {
            if (type === 'studentImage') this.studentImage = file;
            if (type === 'idProof') this.idProof = file;
            if (type === 'certificate') this.certificate = file;
            console.log('✅ File captured:', file.name);
        } else {
            console.warn('⚠️ No file detected from event:', event);
        }
    }

    removeFile(type: string) {
        if (type === 'studentImage') this.studentImage = null;
        if (type === 'idProof') this.idProof = null;
        if (type === 'certificate') this.certificate = null;
    }
}
