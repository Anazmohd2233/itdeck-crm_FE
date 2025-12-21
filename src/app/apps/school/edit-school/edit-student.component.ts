import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
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
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { StudentService } from '../../../services/student.services';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../../services/course.service';
import { Districts, LeadStatus } from '../../../services/enums';
import { SchoolService } from '../../../services/school.service';
import { HttpParams } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-edit-student',
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
        NgxEditorModule,
        CommonModule,
    ],
    templateUrl: './edit-student.component.html',
    styleUrls: ['./edit-student.component.scss'],
})
export class AddSchoolComponent implements OnInit {
    // Text Editor
    editor!: Editor;
    editorContent: string = '';
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

    // File Uploader
    public multiple: boolean = false;

    // Student Form
    studentForm!: FormGroup;
    isSubmitting = false;
    isLoading = false;
    schoolId: number | null = null;
    editMode: boolean = false;
    location: any;
    page: number = 1;
    pageSize: number = 20;
    totalRecords: number = 0;  
      LeadStatus = LeadStatus; // <-- Make enum accessible in HTML
    district = Object.values(Districts);

        @ViewChild(MatPaginator) paginator!: MatPaginator;


    // Options for dropdowns
    leadSources = [
        'Website',
        'Social Media',
        'Referral',
        'Advertisement',
        'Other',
    ];
    courseOptions = [
        'Web Development',
        'Mobile Development',
        'Data Science',
        'UI/UX Design',
        'Digital Marketing',
    ];
    statuses = ['Active', 'Inactive', 'Pending', 'Completed'];

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        public themeService: CustomizerSettingsService,
        private formBuilder: FormBuilder,
        private schoolService: SchoolService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private courseService: CourseService
    ) {}

    ngOnInit(): void {
        this.getLocationList();

        if (isPlatformBrowser(this.platformId)) {
            this.editor = new Editor();
        }

        // Get student ID from route parameters
        // ✅ Get ID from query params
        this.route.queryParams.subscribe((params) => {
            this.schoolId = params['id'] || null;

            console.log('📌 Received school ID:', this.schoolId);

            if (this.schoolId) {
                this.editMode = true;
                this.loadData();
            }
        });

        this.initializeForm();
    }
       

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId) && this.editor) {
            this.editor.destroy();
        }
    }

    private initializeForm(): void {
        this.studentForm = this.formBuilder.group({
            school_name: ['', [Validators.required]],
            location: ['', [Validators.required]],
            strength: ['', [Validators.required]],
            representative_name: [''],
            representative_role: [''],
            representative_number: [''],
            type: [''],
            district: [''],
            status: [''],
        });
    }

    private loadData(): void {
        if (!this.schoolId) return;

        this.isLoading = true;
        this.schoolService.getSchoolById(this.schoolId).subscribe({
            next: (response) => {
                if (response && response.success) {
                    const student = response.school;

                    this.studentForm.patchValue({
                        school_name: student.school_name || '',
                        location: student?.location?.id || '',
                        strength: student.strength || '',
                        representative_name: student.representative_name || '',
                        representative_role: student.representative_role || '',
                        representative_number: student.representative_number || '',
                        district: student.district || '',

                        type: student.type || '',

                        status: student.status,
                    });

                    this.isLoading = false;
                } else {
                    this.toastr.error('Failed to load school data', 'Error');
                    this.isLoading = false;
                }
            },
            error: (error) => {
                console.error('Error loading school:', error);
                this.toastr.error('Error loading school data', 'Error');
                this.isLoading = false;
            },
        });
    }

    onSubmit(): void {
        if (this.studentForm.valid) {
            this.isSubmitting = true;

            const formData = new FormData();
            formData.append('school_name', this.studentForm.value.school_name);
            formData.append('location', this.studentForm.value.location);
            formData.append('type', this.studentForm.value.type);
            formData.append('strength', this.studentForm.value.strength);
            formData.append(
                'representative_name',
                this.studentForm.value.representative_name
            );
            formData.append(
                'representative_role',
                this.studentForm.value.representative_role
            );
            formData.append(
                'representative_number',
                this.studentForm.value.representative_number
            );
            formData.append('district', this.studentForm.value.district);


            if (this.editMode) {
                formData.append('status', this.studentForm.value.status);

                this.schoolService
                    .updateSchool(formData, this.schoolId)
                    .subscribe({
                        next: (response) => {
                            if (response && response.success) {
                                this.toastr.success(
                                    'School updated successfully',
                                    'Success'
                                );
                            } else {
                                this.toastr.error(
                                    'Failed to update School',
                                    'Error'
                                );
                            }
                            this.isSubmitting = false;
                        },
                        error: (error) => {
                            console.error('Error updating School:', error);
                            this.toastr.error('Error updating School', 'Error');
                            this.isSubmitting = false;
                        },
                    });
            } else {
                this.schoolService.createSchool(formData).subscribe({
                    next: (response) => {
                        if (response && response.success) {
                            this.studentForm.reset();
                            this.router.navigate(['/school']);
                            this.toastr.success(
                                'School created successfully',
                                'Success'
                            );
                        } else {
                            this.toastr.error(
                                'Failed to creat School',
                                'Error'
                            );
                        }
                        this.isSubmitting = false;
                    },
                    error: (error) => {
                        console.error('Error creating School:', error);
                        this.toastr.error('Error creating School', 'Error');
                        this.isSubmitting = false;
                    },
                });
            }
        } else {
            this.markFormGroupTouched();
        }
    }

    onCancel(): void {
        this.router.navigate(['/students']);
    }

    private markFormGroupTouched(): void {
        Object.keys(this.studentForm.controls).forEach((key) => {
            const control = this.studentForm.get(key);
            control?.markAsTouched();
        });
    }

    private getLocationList(): void {
        let params = new HttpParams();

        params = params.set('status', true);

        this.schoolService.getLocation(this.page, params).subscribe({
            next: (response) => {
                if (response && response.success) {
                                        this.totalRecords = response.data?.total;

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

    searchTimeout: any; // debounce timer

onDropdownOpened(opened: boolean): void {
  if (opened) {
    this.getLocationList(); // load initial data when dropdown opens
  }
}

onSearchLocation(searchTerm: string): void {
  clearTimeout(this.searchTimeout);
console.log('***searchTerm***',searchTerm)
}

}
