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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { ContactService } from '../../../services/contact.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../services/course.service';
import { UsersService } from '../../../services/users.service';
import { HttpParams } from '@angular/common/http';
import { SchoolService } from '../../../services/school.service';

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
    user_type: any;
    users: any;
    school: any;

    // File Uploader
    public multiple: boolean = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private contactService: ContactService,
        private route: ActivatedRoute, // 👈 Inject ActivatedRoute
        private courseService: CourseService,
        private usersService: UsersService,
        private router: Router,
        private schoolService: SchoolService
    ) {}

    ngOnInit(): void {
        this.user_type = localStorage.getItem('user_type');

        console.log('user_type', localStorage.getItem('user_type'));

        this.getCourseList();
        this.getUserList();
        this.getSchoolList();

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
            // contact_id: ['', Validators.required],
            school_name: [''],
            contact_name: ['', Validators.required],
            email: [''],
            phone: [
                '',
                [
                    Validators.required,

                    Validators.pattern(/^\d{10}$/), // ✅ exactly 10 digits
                ],
            ], // courses: [''],
            // status: ['', Validators.required],
            // lead_source: [''],
            contact_owner: [''],
        });
    }

    onFileSelect(event: any) {
        this.selectedFile = event.target.files[0];
    }

    createContact(): void {
        // Object.keys(this.contactForm.controls).forEach((key) => {
        //     console.log(key, this.contactForm.get(key)?.value);
        // });
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
                                'Contact Updated successfully',
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
                        // contact_id: contact.unique_id,
                        school_name: contact?.school?.id || null,
                        contact_name: contact.contact_name,
                        email: contact.email,
                        phone: contact.phone,
                        // courses: contact.courses?.id,
                        // status: contact.status,
                        lead_source: contact.lead_source,
                        contact_owner: contact?.contact_owner?.id || null,
                    });
                } else {
                    console.error('❌ Contact not found.:');

                    // this.toastr.error('Contact not found.', 'Error');
                }
            },
            error: (err) => {
                console.error('❌ Error loading contact:', err);
                // this.toastr.error('Failed to load contact details.', 'Error');
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

    private getUserList(): void {
        let params = new HttpParams();

        params = params.set('user_type', 'USER');

        this.usersService.getUsers(this.page, params).subscribe({
            next: (response) => {
                if (response && response.success) {
                    this.users = response.data?.users || [];
                } else {
                    // this.toastr.error('Failed to load users', 'Failed');
                    console.error('Failed to load users:', response?.message);
                }
            },
            error: (error) => {
                console.error('API error:', error);
            },
        });
    }
    onCancel(): void {
        this.router.navigate(['/crm-page']);
    }

    private getSchoolList(): void {
        let params = new HttpParams();

        params = params.set('status', true);

        this.schoolService.getSchool(this.page, params).subscribe({
            next: (response) => {
                if (response && response.success) {
                    this.school = response.data?.school || [];
                } else {
                    // this.toastr.error('Failed to load users', 'Failed');
                    console.error('Failed to load school:', response?.message);
                }
            },
            error: (error) => {
                console.error('API error:', error);
            },
        });
    }
}
