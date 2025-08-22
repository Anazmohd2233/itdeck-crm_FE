import { CommonModule, isPlatformBrowser } from '@angular/common';
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
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { StudentService } from '../../../services/student.services';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../../services/course.service';
import { LeadStatus } from '../../../services/enums';
import { SchoolService } from '../../../services/school.service';

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
export class EditLocationComponent implements OnInit {
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
    locationId: number | null = null;
    editMode: boolean = false;
    courses: any;
    page: number = 1;
    LeadStatus = LeadStatus; // <-- Make enum accessible in HTML

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

        if (isPlatformBrowser(this.platformId)) {
            this.editor = new Editor();
        }

        // Get student ID from route parameters
        // ✅ Get ID from query params
        this.route.queryParams.subscribe((params) => {
            this.locationId = params['id'] || null;

            console.log('📌 Received location ID:', this.locationId);

            if (this.locationId) {
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
            name: ['', [Validators.required]],
                        status: [''],

        });
    }

    private loadData(): void {
        if (!this.locationId) return;

        this.isLoading = true;
        this.schoolService.getLocationById(this.locationId).subscribe({
            next: (response) => {
                if (response && response.success) {
                    const student = response.location;

                    this.studentForm.patchValue({
                        name: student.name || '',

                        status: student.status,
                    });

                    this.isLoading = false;
                } else {
                    this.toastr.error('Failed to load location data', 'Error');
                    this.isLoading = false;
                }
            },
            error: (error) => {
                console.error('Error loading location:', error);
                this.toastr.error('Error loading location data', 'Error');
                this.isLoading = false;
            },
        });
    }

    onSubmit(): void {
        if (this.studentForm.valid) {
            this.isSubmitting = true;

            const formData = new FormData();
            formData.append('name', this.studentForm.value.name);

            if (this.editMode) {
                formData.append('status', this.studentForm.value.status);

                this.schoolService
                    .updateLocation(formData, this.locationId)
                    .subscribe({
                        next: (response) => {
                            if (response && response.success) {
                          
                                this.toastr.success(
                                    'Location updated successfully',
                                    'Success'
                                );
                            } else {
                                this.toastr.error(
                                    'Failed to update Location',
                                    'Error'
                                );
                            }
                            this.isSubmitting = false;
                        },
                        error: (error) => {
                            console.error('Error updating Location:', error);
                            this.toastr.error(
                                'Error updating Location',
                                'Error'
                            );
                            this.isSubmitting = false;
                        },
                    });
            } else {
                this.schoolService.createLocation(formData).subscribe({
                    next: (response) => {
                        if (response && response.success) {
                                  this.studentForm.reset();
                                this.router.navigate(['/location']);
                            this.toastr.success(
                                'Location created successfully',
                                'Success'
                            );
                        } else {
                            this.toastr.error(
                                'Failed to creat Location',
                                'Error'
                            );
                        }
                        this.isSubmitting = false;
                    },
                    error: (error) => {
                        console.error('Error creating Location:', error);
                        this.toastr.error('Error creating Location', 'Error');
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

   
}
