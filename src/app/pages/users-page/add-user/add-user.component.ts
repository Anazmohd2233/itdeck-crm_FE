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
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UsersService } from '../../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { SchoolService } from '../../../services/school.service';

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
    editMode: boolean = false;
    userId: string | null = null; // 👈 Store the ID here
    page: number = 1;
    location: any;

    // File Uploader
    public multiple: boolean = false;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        public themeService: CustomizerSettingsService,
        private usersService: UsersService,
        private toastr: ToastrService,
        private route: ActivatedRoute, // 👈 Inject ActivatedRoute
        private schoolService: SchoolService
    ) {}

    ngOnInit(): void {
        this.initializeUserForm();
        this.getLocationList();

        // ✅ Get ID from query params
        this.route.queryParams.subscribe((params) => {
            this.userId = params['user_id'] || null;
            console.log('📌 Received user ID:', this.userId);

            // If we have an ID, it’s an edit — fetch contact details
            if (this.userId) {
                this.editMode = true;
                this.loadUser();
            }
        });
    }

    initializeUserForm() {
        this.userForm = this.fb.group({
            user_name: ['', Validators.required],
            name: [''],
            email: [''],
            phone: [''],
            school_type: [''],
            designation: [''],
            status: [''],
            password: [''],
            user_type: ['', Validators.required],
            location: ['', [Validators.required]],
        });
    }

    onFileSelect(event: any) {
        this.selectedFile = event.target.files[0];
    }

    createUser(): void {
        if (this.userForm.invalid) {
            console.log('user add form not valis');
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

    loadUser() {
        this.usersService.getUserById(this.userId).subscribe({
            next: (response) => {
                if (response.success) {
                    const contact = response.user;

                    // ✅ Patch form values
                    this.userForm.patchValue({
                        // contact_id: contact.unique_id,
                        user_name: contact?.user_name || null,
                        location: contact?.location?.id || '',

                        name: contact?.name,
                        email: contact?.email,
                        phone: contact?.phone,
                        school_type: contact?.school_type,
                        // status: contact.status,
                        designation: contact?.designation,
                        status: contact.status,

                        user_type: contact?.user_type || null,
                    });
                } else {
                    console.error('❌ user not found.:');

                    // this.toastr.error('Contact not found.', 'Error');
                }
            },
            error: (err) => {
                console.error('❌ Error loading user:', err);
                this.toastr.error('Failed to load user details.', 'Error');
            },
        });
    }

    private getLocationList(): void {
        let params = new HttpParams();

        params = params.set('status', true);

        this.schoolService.getLocation(this.page, params).subscribe({
            next: (response) => {
                if (response && response.success) {
                    this.location = response.data?.location || [];
                } else {
                    // this.toastr.error('Failed to load users', 'Failed');
                    console.error(
                        'Failed to load location:',
                        response?.message
                    );
                }
            },
            error: (error) => {
                console.error('API error:', error);
            },
        });
    }
}
