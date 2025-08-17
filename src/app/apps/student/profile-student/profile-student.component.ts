import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import {
    Component,
    Inject,
    OnInit,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core';
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
import {
    Router,
    ActivatedRoute,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
} from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { StudentService } from '../../../services/student.services';
import { ToastrService } from 'ngx-toastr';
import { RecentActivityComponent } from '../../../pages/profile-page/user-profile/recent-activity/recent-activity.component';
import { AllProjectsComponent } from '../../../pages/profile-page/user-profile/all-projects/all-projects.component';
import { PaymentsService } from '../../../services/payments.service';
import { CourseService } from '../../../services/course.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-profile02-student',
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
        RouterLinkActive,
        RouterOutlet,
        AllProjectsComponent,
        RecentActivityComponent,

        MatTableModule,
        MatPaginatorModule,
        NgIf,
        MatTooltipModule,
    ],

    templateUrl: './profile-student.component.html',
    styleUrls: ['./profile-student.component.scss'],
})
export class ProfileStudentComponent implements OnInit {
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
    isSubmitting = false;
    isLoading = false;
    studentId: any;
    editMode: boolean = false;
    paymentForm!: FormGroup;
    courses: any;
    page: number = 1;
    student: any;
    ELEMENT_DATA: PeriodicElement[] = [];

    displayedColumns: string[] = [
        'course_name',
        'payment_type',
        'installment_amount',
        'due_date',
        'is_paid',
        // 'action',
    ];
    dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

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
        private fb: FormBuilder,
        private studentService: StudentService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private paymentsService: PaymentsService,
        private courseService: CourseService
    ) {
        this.initializeForm();
    }

    ngOnInit(): void {
        // Check if user is authenticated
        this.getCourseList();

        if (isPlatformBrowser(this.platformId)) {
            this.editor = new Editor();
        }

        // Get student ID from route parameters
        // ✅ Get ID from query params
        this.route.queryParams.subscribe((params) => {
            this.studentId = params['student_id'] || null;

            console.log('📌 Received student ID:', this.studentId);

            if (this.studentId) {
                this.editMode = true;
                this.loadStudentData();
            }
        });
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId) && this.editor) {
            this.editor.destroy();
        }
    }

    private initializeForm(): void {
        this.paymentForm = this.fb.group({
            course_id: ['', Validators.required],
            payment_type: ['', Validators.required],
            emi_months: [''],
            start_date: ['', Validators.required],
        });
    }

    private loadStudentData(): void {
        if (!this.studentId) return;

        this.isLoading = true;
        this.studentService.getStudentById(this.studentId).subscribe({
            next: (response) => {
                if (response && response.success) {
                    const studentData = response.customer;
                    this.student = response.customer;


                    this.editorContent = studentData.notes || '';
                    this.isLoading = false;


                     const contacts = response.data?.contacts || [];

                    this.ELEMENT_DATA = studentData.payments.map((u: any) => ({
                        id: u.id,
                        course_name: u.course.service_name || 'N/A',

                        payment_type: u.payment_type || 'N/A',
                        installment_amount: u.installment_amount || 'N/A',
                        due_date: u.due_date || 'N/A',

                        is_paid: u.is_paid,
                       
                        // action: '', 
                    }));

                  

                    this.dataSource.data = this.ELEMENT_DATA;
                } else {
                    this.toastr.error('Failed to load student data', 'Error');
                    this.isLoading = false;
                }
            },
            error: (error) => {
                console.error('Error loading student:', error);
                this.toastr.error('Error loading student data', 'Error');
                this.isLoading = false;

                // Handle authentication errors
                if (error.status === 401 || error.status === 403) {
                    console.error(
                        'Authentication failed, redirecting to login'
                    );
                    localStorage.removeItem('Authorization');
                    this.router.navigate(['/authentication']);
                }
            },
        });
    }

    onSubmitPayment(): void {
        Object.keys(this.paymentForm.controls).forEach((key) => {
            console.log(key, this.paymentForm.get(key)?.value);
        });
        if (this.paymentForm.invalid) {
            console.log('********payment form not vlaid*******');

            this.paymentForm.markAllAsTouched();
            return;
        }
        this.isSubmitting = true;

        const formData = new FormData();
        Object.keys(this.paymentForm.controls).forEach((key) => {
            formData.append(key, this.paymentForm.get(key)?.value);
        });

        formData.append('student_id', this.studentId);

        this.paymentsService.createPayment(formData).subscribe({
            next: (response) => {
                if (response.success) {
                    this.isSubmitting = false;
                    this.paymentForm.reset();
                    this.toastr.success(
                        'Payment Added successfully',
                        'Success'
                    );
                    console.log('✅ Payment Added successfully');
                } else {
                    this.isSubmitting = false;

                    this.toastr.error(
                        response.message || 'Failed to Add Payment.',
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

export interface PeriodicElement {
    course_name: any;
    payment_type: any;
    installment_amount: any;
    due_date: any;
    is_paid: any;
    // action: any;
}
