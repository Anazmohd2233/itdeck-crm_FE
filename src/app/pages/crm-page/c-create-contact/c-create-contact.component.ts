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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { ContactService } from '../../../services/contact.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../services/course.service';

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
    contactId: string | null = null; // 👈 Store the ID here
    editMode: boolean = false;
    selectedFile: File | null = null;
    courses: any;
        page: number = 1;


    // File Uploader
    public multiple: boolean = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private contactService: ContactService,
        private route: ActivatedRoute, // 👈 Inject ActivatedRoute
                        private courseService: CourseService,
        
    ) {}

    ngOnInit(): void {

        this.getCourseList();
        // ✅ Get ID from query params
        this.route.queryParams.subscribe((params) => {
            this.contactId = params['contact_id'] || null;
            console.log('📌 Received Contact ID:', this.contactId);

            // If we have an ID, it’s an edit — fetch contact details
            if (this.contactId) {
                this.editMode = true;
                this.loadContactDetails(this.contactId);
            }
        });

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

        if (this.editMode) {
            this.contactService
                .updateContact(formData, this.contactId)
                .subscribe({
                    next: (response) => {
                        if (response.success) {
                            this.isSubmitting = false;
                            this.toastr.success(
                                'Contact Added successfully',
                                'Success'
                            );
                            console.log('✅ Contact Updated successfully');
                        } else {
                            this.isSubmitting = false;

                            this.toastr.error(
                                response.message || 'Failed to Update Contact.',
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
        } else {
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

    loadContactDetails(id: any) {
        this.contactService.getContactById(id).subscribe({
            next: (response) => {
                if (response.success) {
                    const contact = response.contact;

                    // ✅ Patch form values
                    this.contactForm.patchValue({
                        contact_id: contact.unique_id,
                        contact_name: contact.contact_name,
                        email: contact.email,
                        phone: contact.phone,
                        courses: contact.courses.id,
                        status: contact.status,
                        lead_source: contact.lead_source,
                    });
                } else {
                    this.toastr.error('Customer not found.', 'Error');
                }
            },
            error: (err) => {
                console.error('❌ Error loading contact:', err);
                this.toastr.error('Failed to load contact details.', 'Error');
            },
        });
    }


         private getCourseList(): void {
        // let params = new HttpParams();

        // params = params.set('user_type', 'USER');

        this.courseService.getCourse(this.page).subscribe({
            next: (response) => {
                if (response && response.success) {
                    this.courses = response.data?.services || [];
                } else {
                    // this.toastr.error('Failed to load users', 'Failed');
                    console.error('Failed to load courses:', response?.message);
                }
            },
            error: (error) => {
                console.error('API error:', error);
            },
        });
    }
}
