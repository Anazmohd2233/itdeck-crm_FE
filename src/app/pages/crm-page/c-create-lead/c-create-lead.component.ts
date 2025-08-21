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
import { ToastrService } from 'ngx-toastr';
import { CommonModule, NgIf } from '@angular/common';
import { ContactService } from '../../../services/contact.service';
import { LeadsService } from '../../../services/lead.service';
import { LeadStatus } from '../../../services/enums';
import { UsersService } from '../../../services/users.service';
import { HttpParams } from '@angular/common/http';
import { CourseService } from '../../../services/course.service';

@Component({
    selector: 'app-c-create-lead',
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
        NgIf,
        CommonModule,
    ],
    templateUrl: './c-create-lead.component.html',
    styleUrl: './c-create-lead.component.scss',
})
export class CCreateLeadComponent {
    // File Uploader
    LeadStatus = LeadStatus; // <-- Make enum accessible in HTML

    public multiple: boolean = false;
    taskCreated: boolean = false;
    contactId: string | null = null; // 👈 Store the ID here
    leadId: string | null = null; // 👈 Store the ID here

    leadFromContactMode: boolean = false;
    leadForm!: FormGroup;
    isSubmitting = false;
    editMode: boolean = false;
    selectedFile: File | null = null;
    page: number = 1;
    users: any;
    courses: any;

    constructor(
        public themeService: CustomizerSettingsService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private contactService: ContactService,
        private leadsService: LeadsService,
        private usersService: UsersService,
        private toastr: ToastrService,
                private courseService: CourseService,
                 private router: Router,
        
    ) {}

    ngOnInit(): void {

                this.getUserList();
this.getCourseList();
        // ✅ Get ID from query params
        this.route.queryParams.subscribe((params) => {
            this.contactId = params['contact_id'] || null;
            this.leadId = params['lead_id'] || null;

            console.log('📌 Received Contact ID:', this.contactId);
            console.log('📌 Received Lead ID:', this.leadId);

            // If we have an ID, it’s an edit — fetch contact details
            if (this.contactId) {
                this.leadFromContactMode = true;
                this.loadContactDetails(this.contactId);
            }

            if (this.leadId) {
                this.editMode = true;
                this.loadLeadDetails(this.leadId);
            }
        });

        this.initializeleadForm();
    }

    onFileSelect(event: any) {
        this.selectedFile = event.target.files[0];
    }

    initializeleadForm() {
        this.leadForm = this.fb.group({
            contact_id: ['', Validators.required],
            customer_name: ['', Validators.required],
            email: [''],
            phone: ['', Validators.required],
            courses: [''],
            status: ['', Validators.required],
            lead_source: ['', Validators.required],
            created_date: [''],
            assign_to: ['', Validators.required],
        });
    }

    loadContactDetails(id: any) {
        this.contactService.getContactById(id).subscribe({
            next: (response) => {
                if (response.success) {
                    const contact = response.contact;

                    // ✅ Patch form values
                    this.leadForm.patchValue({
                        contact_id: contact.unique_id,
                        customer_name: contact.contact_name,
                        email: contact.email,
                        phone: contact.phone,
                        courses: contact.courses.id,
                        status: contact.status,
                        lead_source: contact.lead_source,
                    });
                } else {
                    console.log('Lead not found.')
                    // this.toastr.error('Lead not found.', 'Error');
                }
            },
            error: (err) => {
                console.error('❌ Error loading contact:', err);
                this.toastr.error('Failed to load contact details.', 'Error');
            },
        });
    }

    loadLeadDetails(id: any) {
        this.leadsService.getLeadById(id).subscribe({
            next: (response) => {
                if (response.success) {
                    const leads = response.leads;

                    // ✅ Patch form values
                    this.leadForm.patchValue({
                        contact_id: leads.unique_id,
                        customer_name: leads.customer_name,
                        email: leads.email,
                        phone: leads.phone,
                        courses: leads.courses.id,
                        status: leads.status,
                        lead_source: leads.lead_source,
                        created_date: leads.created_date,

                        assign_to: leads.assign_to.id,
                    });
                } else {
                    this.toastr.error('Lead not found.', 'Error');
                }
            },
            error: (err) => {
                console.error('❌ Error loading Lead:', err);
                this.toastr.error('Failed to load Lead details.', 'Error');
            },
        });
    }

    createLead(): void {
        Object.keys(this.leadForm.controls).forEach((key) => {
            console.log(key, this.leadForm.get(key)?.value);
        });
        if (this.leadForm.invalid) {
            console.log('********lead form not vlaid*******');

            this.leadForm.markAllAsTouched();
            return;
        }
        this.isSubmitting = true;

        const formData = new FormData();
        Object.keys(this.leadForm.controls).forEach((key) => {
            formData.append(key, this.leadForm.get(key)?.value);
        });

        if (this.selectedFile) {
            formData.append('contact_img', this.selectedFile);
        }

        if (this.editMode) {
            this.leadsService.updateLead(formData, this.leadId).subscribe({
                next: (response) => {
                    if (response.success) {
                        this.isSubmitting = false;
                        this.toastr.success(
                            'Lead Updated successfully',
                            'Success'
                        );
                        console.log('✅ Lead Updated successfully');
                    } else {
                        this.isSubmitting = false;

                        this.toastr.error(
                            response.message || 'Failed to Update Lead.',
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
            if(this.contactId){
                            formData.append('contact', this.contactId);

            }
            this.leadsService.createLead(formData).subscribe({
                next: (response) => {
                    if (response.success) {
                        this.isSubmitting = false;
                        this.leadForm.reset();
                        this.toastr.success(
                            'Lead Added successfully',
                            'Success'
                        );
                        console.log('✅ Lead Added successfully');
                    } else {
                        this.isSubmitting = false;

                        this.toastr.error(
                            response.message || 'Failed to Add Lead.',
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

      onCancel(): void {
        this.router.navigate(['/crm-page/leads']);
    }
}
