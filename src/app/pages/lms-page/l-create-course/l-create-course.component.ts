import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { UsersService } from '../../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { CourseService } from '../../../services/course.service';

@Component({
    selector: 'app-l-create-course',
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
        NgIf,
                CommonModule,
        
    ],
    templateUrl: './l-create-course.component.html',
    styleUrl: './l-create-course.component.scss',
})
export class LCreateCourseComponent {
    users: any;
    page: number = 1;
    courseForm!: FormGroup;
        courseId: string | null = null; // 👈 Store the ID here
  editMode: boolean = false;
    isSubmitting = false;


    // Text Editor
    editor!: Editor | null; // Make it nullable
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
        if (isPlatformBrowser(this.platformId)) {
            // Initialize the editor only in the browser
            this.editor = new Editor();
        }

        this.getUserList();


        // ✅ Get ID from query params
        this.route.queryParams.subscribe((params) => {
            this.courseId = params['course_id'] || null;

            console.log('📌 Received courseId ID:', this.courseId);

            

            if (this.courseId) {
                this.editMode = true;
                this.loadCourse(this.courseId);
            }
        });

                this.initializeCourseForm();

    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId) && this.editor) {
            this.editor.destroy();
        }
    }

    // File Uploader
    public multiple: boolean = false;

    // Instructor Select
    instructor = new FormControl('');
   

    // Tags Select
    tags = new FormControl('');
    tagsList: string[] = [
        'Design',
        'Writing',
        'Security',
        'Valuation',
        'Angular',
    ];

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        public themeService: CustomizerSettingsService,
        private usersService: UsersService,
        private toastr: ToastrService,
         private route: ActivatedRoute,
        private fb: FormBuilder,
                private courseService: CourseService,

    ) {}

      initializeCourseForm() {
            this.courseForm = this.fb.group({
                service_name: ['', Validators.required],
                description: [''],
                price: ['', Validators.required],
                start_date: ['', Validators.required],
                end_date: ['', Validators.required],
                category: ['', Validators.required],
                status: ['', Validators.required],
                // instructor: ['', Validators.required],
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


       loadCourse(id: any) {
        this.courseService.getCoursedById(id).subscribe({
            next: (response) => {
                if (response.success) {
                    const service = response.service;

                    // ✅ Patch form values
                    this.courseForm.patchValue({
                        service_name: service.service_name,
                        description: service.description,
                        price: service.price,
                        status: service.status,
                        start_date: service.start_date,
                        end_date: service.end_date,
                        category: service.category,


                        // assign_to: service.assign_to.id,
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


      createCourse(): void {
        Object.keys(this.courseForm.controls).forEach((key) => {
            console.log(key, this.courseForm.get(key)?.value);
        });
        if (this.courseForm.invalid) {
            console.log('********Course form not vlaid*******');

            this.courseForm.markAllAsTouched();
            return;
        }
        this.isSubmitting = true;

        const formData = new FormData();
        Object.keys(this.courseForm.controls).forEach((key) => {
            formData.append(key, this.courseForm.get(key)?.value);
        });

  

        if (this.editMode) {
            this.courseService.updateCourse(formData, this.courseId).subscribe({
                next: (response) => {
                    if (response.success) {
                        this.isSubmitting = false;
                        this.toastr.success(
                            'Course Updated successfully',
                            'Success'
                        );
                        console.log('✅ Course Updated successfully');
                    } else {
                        this.isSubmitting = false;

                        this.toastr.error(
                            response.message || 'Failed to Update Course.',
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
            this.courseService.createCourse(formData).subscribe({
                next: (response) => {
                    if (response.success) {
                        this.isSubmitting = false;
                        this.courseForm.reset();
                        this.toastr.success(
                            'Course Added successfully',
                            'Success'
                        );
                        console.log('✅ Course Added successfully');
                    } else {
                        this.isSubmitting = false;

                        this.toastr.error(
                            response.message || 'Failed to Add Course.',
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
}
