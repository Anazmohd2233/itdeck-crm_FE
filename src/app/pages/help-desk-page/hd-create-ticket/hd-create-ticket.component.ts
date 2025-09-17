import {
    Component,
    Inject,
    Input,
    PLATFORM_ID,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule,
    FormGroup,
    FormBuilder,
    Validators,
    FormArray,
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
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { UsersService } from '../../../services/users.service';
import { HttpParams } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { Division, TaskActivity } from '../../../services/enums';
import { ToastrService } from 'ngx-toastr';
import {
    MatDialog,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SelectionModel } from '@angular/cdk/collections';
import { SchoolService } from '../../../services/school.service';
import {
    MatSlideToggleChange,
    MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { GoogleMap } from '@angular/google-maps';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
    selector: 'app-hd-create-ticket',
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
        NgxMaterialTimepickerModule,
        NgxEditorModule,
        NgIf,
        CommonModule,
        MatDividerModule,
        MatDialogModule,
        MatIcon,

        MatTableModule,
        MatPaginatorModule,

        MatCheckboxModule,
        MatTooltipModule,

        MatSlideToggleModule,
        GoogleMapsModule,
    ],
    templateUrl: './hd-create-ticket.component.html',
    styleUrls: ['./hd-create-ticket.component.scss'],
})
export class HdCreateTicketComponent {

     expenceDisplayedColumns: string[] = [
    'date',
    'food_expence',
    'other_expence',
    'totalKm',
    'totalTravelExp',
    'grandTotal',
    'action',
  ];
  expenceDataSource = new MatTableDataSource<Expence>([]);
  expandedElement: Expence | null = null;
    // Text Editor
    editor!: Editor | null;
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

    ELEMENT_DATA: PeriodicElement[] = [];

    displayedColumns: string[] = [
        'date',
        'start_point',
        'end_point',
        'kilometer',
        'travel_expence',
        'food_expence',
        'other_expence',
        'total',

        'action',
    ];
    dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    progress: number = 0;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
            this.expenceDataSource.paginator = this.paginator;

    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this.dataSource.data);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: PeriodicElement): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
            row.start_point + 1
        }`;
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    // File Uploader
    public multiple: boolean = false;

    // Task Form
    taskForm!: FormGroup;
    expenceForm!: FormGroup;
    studentForm!: FormGroup;

    isSubmitting = false;
    users: any;
    location: any;

    school: any;
        user_type: any;

    taskSchool: any;
    contactCount: any;
    locations: any[] = []; // timeline of received locations

    page: number = 1;
    TaskActivity = TaskActivity;
    taskActivityValues = Object.values(TaskActivity);
    taskId: string | null = null; // 👈 Store the ID here
    editMode: boolean = false;
    tracking: boolean = false;
    divisions = Object.values(Division);
    

    taskData: any;
    dialogRef!: MatDialogRef<any>; // store reference
    dialogRef_Students!: MatDialogRef<any>; // store reference

    @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

    zoom = 14;
    center: google.maps.LatLngLiteral = { lat: 10.0, lng: 76.0 }; // default
    markers: any[] = [];
    path: google.maps.LatLngLiteral[] = [];

    @ViewChild('taskDialog') taskDialog!: TemplateRef<any>;
    @ViewChild('taskDialog_student') taskDialog_student!: TemplateRef<any>;

    searchFieldSchool: string = '';
    searchFieldUser: string = '';
    searchFieldLocation: string = '';

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        public themeService: CustomizerSettingsService,
        private taskService: TaskService,
        private router: Router,
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private schoolService: SchoolService
    ) {
        this.initializeForm();
        this.initializeExpenceForm();
    }

    ngOnInit(): void {
                this.user_type = localStorage.getItem('user_type');

        //  this.getExpenceList();
        this.getUserList();
        this.getSchoolList();
        this.getLocationList();

        this.route.queryParams.subscribe((params) => {
            this.taskId = params['task_id'] || null;
            console.log('📌 Received taskId ID:', this.taskId);

            // If we have an ID, it’s an edit — fetch contact details
            if (this.taskId) {
                this.editMode = true;
                this.loadTaskDetails();
            }
        });

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

    // Search Filter
    searchSchool() {
        console.log('school search keyword', this.searchFieldSchool);
        this.getSchoolList(this.searchFieldSchool);
    }

    searchLocation() {
        console.log('school search keyword', this.searchFieldLocation);
        this.getLocationList(this.searchFieldLocation);
    }

    searchUser() {
        console.log('user search keyword', this.searchFieldUser);
        this.getUserList(this.searchFieldUser);
    }

    clearSearchSchool() {
        this.getSchoolList();

        this.searchFieldSchool = ''; // Clear the input by setting the property to an empty string
    }
    clearSearchLocation() {
        this.getLocationList();

        this.searchFieldLocation = ''; // Clear the input by setting the property to an empty string
    }
    clearSearchUser() {
        this.getUserList();

        this.searchFieldUser = ''; // Clear the input by setting the property to an empty string
    }

    private initializeForm(): void {
        this.taskForm = this.formBuilder.group({
            // task_title: ['', [Validators.required, Validators.minLength(3)]],
            // activity: [[]],
            priority: [''],
            assigned_to: [''],
            due_date: ['', Validators.required],
            due_time: [''],
            note: [''],
            division: [''],
            taskImage: [''],
            // location: [''],
            school_name: ['', Validators.required],
            location: [''],
        });
    }

    onLocationSelected(loc: any) {
        if (loc) {
            console.log('Selected Location:', loc);
            this.getSchoolList(null, loc);
        }
    }

    private getLocationList(search?: any): void {
        let params = new HttpParams().set('status', true);

        if (search) {
            params = params.set('search', search);
        }

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

    onSubmit(): void {
        if (this.taskForm.valid && !this.isSubmitting) {
            this.isSubmitting = true;

            // Format date for MySQL database (YYYY-MM-DD format)
            const dueDate = new Date(this.taskForm.value.due_date);
            const formattedDate = dueDate.toISOString().split('T')[0]; // Gets YYYY-MM-DD format

            // Create FormData for file uploads
            const formData = new FormData();
            Object.keys(this.taskForm.controls).forEach((key) => {
                formData.append(key, this.taskForm.get(key)?.value);
            });

            // Handle file uploads
            const taskImage = this.taskForm.value.taskImage;

            if (taskImage) {
                formData.append('contact_img', taskImage);
            }

            if (this.editMode) {
                this.taskService.updateTask(formData, this.taskId).subscribe({
                    next: (response) => {
                        if (response.success) {
                            this.loadTaskDetails();
                            this.isSubmitting = false;
                            this.toastr.success(
                                'Task Updated successfully',
                                'Success'
                            );
                            console.log('✅ Task Updated successfully');
                        } else {
                            this.isSubmitting = false;

                            this.toastr.error(
                                response.message || 'Failed to Update Task.',
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
                this.taskService.createTask(formData).subscribe({
                    next: (response) => {
                        if (response.success) {
                            console.log('Task created successfully:', response);

                            this.router.navigate(['/task']);
                            this.isSubmitting = false;
                        } else {
                            this.isSubmitting = false;

                            this.toastr.error(
                                response.message || 'Failed to Create Task.',
                                'Error'
                            );
                            console.error('❌ add failed:', response.message);
                        }
                    },
                    error: (error) => {
                        console.error('Error creating task:', error);
                        this.isSubmitting = false;

                        // Handle authentication errors
                        if (error.status === 401 || error.status === 403) {
                            console.error(
                                'Authentication failed, redirecting to login'
                            );
                            localStorage.removeItem('Authorization');
                            this.router.navigate(['/authentication']);
                        }
                        // You can add other error handling/notification here
                    },
                });
            }
        } else {
            // Mark all fields as touched to show validation errors
            this.markFormGroupTouched();
        }
    }

    onCancel(): void {
        this.router.navigate(['/task']);
    }

    private markFormGroupTouched(): void {
        Object.keys(this.taskForm.controls).forEach((key) => {
            const control = this.taskForm.get(key);
            control?.markAsTouched();
        });
    }

    // Getter methods for easy access to form controls in template
    // get task_title() {
    //     return this.taskForm.get('task_title');
    // }
    get task_type() {
        return this.taskForm.get('task_type');
    }
    get school_name() {
        return this.taskForm.get('school_name');
    }
    get contact_id() {
        return this.taskForm.get('contact_id');
    }
    get priority() {
        return this.taskForm.get('priority');
    }
    get assigned_to() {
        return this.taskForm.get('assigned_to');
    }
    get due_date() {
        return this.taskForm.get('due_date');
    }
    get division() {
        return this.taskForm.get('division');
    }

    private getUserList(search?: any): void {
        let params = new HttpParams().set('user_type', 'USER');

        if (search) {
            params = params.set('search', search);
        }

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

    private getSchoolList(search?: any, locId?: any): void {
        let params = new HttpParams().set('status', true);

        if (search) {
            params = params.set('search', search);
        }
        if (locId) {
            params = params.set('location', locId);
        }

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

      toggleExpand(element: Expence) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  applyExpenceFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.expenceDataSource.filter = filterValue.trim().toLowerCase();
  }

    loadTaskDetails() {
        this.taskService.getTaskById(this.taskId).subscribe({
            next: (response) => {
                if (response.success) {
                              this.expenceDataSource.data = response.expences;

                    this.contactCount = response.contactCount;
                    this.taskData = response.task;
                    const task = response.task;
                    const expence = response.task.expence;
                    this.taskSchool = response.task.school;
                    this.getSchoolList(response?.task?.school?.school_name);
                    this.tracking = response.task.tracking;

                    this.progress =
                        (response.contactCount / task.school?.strength) * 100;

                    // ✅ Patch form values
                    this.taskForm.patchValue({
                        // task_title: task.task_title,
                        priority: task.priority,
                        assigned_to: task?.assigned_to.id,
                        due_date: task.due_date,
                        division: task.division,
                        note: task.note,
                        taskImage: task?.task_image_url,
                        school_name: task?.school?.id,
                        location: task?.school?.location?.id,
                    });

                    this.ELEMENT_DATA = expence.map((u: any) => ({
                        id: u.id,
                        date: u.date || 'N/A',

                        start_point: u.start_point || 'N/A',
                        end_point: u.end_point || 'N/A',
                        kilometer: u.kilometer || 'N/A',
                        other_expence: u.other_expence || '-',
                        travel_expence: u.travel_expence || '-',
                        food_expence: u.food_expence || '-',
                        total: u.total || '-',

                        action: '', // we will handle icons directly in template
                    }));

                    this.dataSource.data = this.ELEMENT_DATA;
                } else {
                    console.log('Customer not found.');
                    // this.toastr.error('Customer not found.', 'Error');
                }
            },
            error: (err) => {
                console.error('❌ Error loading contact:', err);
                // this.toastr.error('Failed to load contact details.', 'Error');
            },
        });
    }

    createExpence(): void {
        if (this.expenceForm.valid) {
            // Cast your form value to correct type
            const expenses: Expense[] = this.expenceForm.value.expenses;

            const payload = {
                task_id: this.taskId,
                date:this.expenceForm.value.date,
                food_expence:this.expenceForm.value.food_expence,
                other_expence:this.expenceForm.value.other_expence,
                expenses: expenses.map((exp: Expense) => ({
                    ...exp,
                })),
            };

            console.log('payload', JSON.stringify(payload));

            this.isSubmitting = true;

            this.taskService.createExpence(payload).subscribe({
                next: (response) => {
                    if (response.success) {
                        this.loadTaskDetails();
                        this.isSubmitting = false;
                        this.closeDialog();
                        this.toastr.success(
                            'Expence Added successfully',
                            'Success'
                        );
                        console.log('✅ Expence Added successfully');
                    } else {
                        this.isSubmitting = false;

                        this.toastr.error(
                            response.message || 'Failed to Add Expence.',
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
            // Mark all fields as touched to show validation errors
            this.markFormGroupTouched();
        }
    }

    createStudent(): void {
        // Cast your form value to correct type
        const students: Students[] = this.studentForm.value.students;

        const payload = {
            task_id: this.taskId,
            school_id: this.taskSchool.id,
            assigned_to: this.taskData.assigned_to.id,

            students: students.map((std: Students) => ({
                ...std,
            })),
        };

        console.log('payload', JSON.stringify(payload));

        this.isSubmitting = true;

        this.taskService.createBulkContact(payload).subscribe({
            next: (response) => {
                if (response.success) {
                    this.loadTaskDetails();
                    this.isSubmitting = false;
                    this.closeDialog();
                    this.toastr.success(
                        'Students Added successfully',
                        'Success'
                    );
                    console.log('✅ Students Added successfully');
                } else {
                    this.isSubmitting = false;

                    this.toastr.error(
                        response.message || 'Failed to Add Students.',
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

    openDialog() {
        this.initializeExpenceForm();
        this.dialogRef = this.dialog.open(this.taskDialog, {
            width: '85%',
            maxWidth: '100vw', // prevents overflow
        });
    }

    openDialog_add_student() {
        this.initializeStudentForm();
        this.dialogRef_Students = this.dialog.open(this.taskDialog_student, {
            width: '40%',
            maxWidth: '100vw', // prevents overflow
        });
    }

    closeDialog() {
        if (this.dialogRef) {
            this.dialogRef.close();
        }
        if (this.dialogRef_Students) {
            this.dialogRef_Students.close();
        }
    }

    // component.ts
    initializeExpenceForm(): void {
        this.expenceForm = this.formBuilder.group({
                        date: ['', Validators.required],
   food_expence: ['', Validators.required],
            other_expence: [''],
            expenses: this.formBuilder.array([this.createExpenseGroup()]),
        });
    }

    // component.ts
    initializeStudentForm(): void {
        this.studentForm = this.formBuilder.group({
            students: this.formBuilder.array([this.createStudentGroup()]),
        });

        // 👇 Only track the last student row
        this.students.valueChanges.subscribe((students) => {
            const lastIndex = students.length - 1;
            const lastStudent = students[lastIndex];

            if (lastStudent.student_name && lastStudent.student_phone) {
                this.onStudentFilled(lastIndex, lastStudent);
            }
        });
    }

    onStudentFilled(index: number, student: any) {
        const lastIndex = this.students.length - 1;

        // Only add if the filled row is the last one
        if (index === lastIndex) {
            this.students.push(this.createStudentGroup());
            console.log('✅ New blank row added automatically', index, student);
        }
    }

    createExpenseGroup(): FormGroup {
        return this.formBuilder.group({
            start_point: ['', Validators.required],
            end_point: ['', Validators.required],
            kilometer: ['', Validators.required],
          
        });
    }

    // createStudentGroup(): FormGroup {
    //     return this.formBuilder.group({
    //         student_name: [''],
    //         student_phone: [''],
    //     });
    // }

    createStudentGroup(): FormGroup {
        return this.formBuilder.group({
            student_name: ['', Validators.required],
            student_phone: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/^\d{10}$/), // ✅ exactly 10 digits
                ],
            ],
        });
    }

    get expenses(): FormArray {
        return this.expenceForm.get('expenses') as FormArray;
    }

    addExpense(): void {
        this.expenses.push(this.createExpenseGroup());
    }

    removeExpense(index: number): void {
        this.expenses.removeAt(index);
    }

    get students(): FormArray {
        return this.studentForm.get('students') as FormArray;
    }

    addStudent(): void {
        this.students.push(this.createStudentGroup());
    }

    removeStudent(index: number): void {
        this.students.removeAt(index);
    }

    private getExpenceList(): void {
        this.taskService.getExpences(this.page).subscribe({
            next: (response) => {
                if (response && response.success) {
                    const contacts = response.data?.expences || [];

                    this.ELEMENT_DATA = contacts.map((u: any) => ({
                        id: u.id,
                        date: u.date || 'N/A',

                        start_point: u.start_point || 'N/A',
                        end_point: u.end_point || 'N/A',
                        kilometer: u.kilometer || 'N/A',

                        food_expence: u.food_expence || '-',
                        total: u.total || '-',

                        // action: '', // we will handle icons directly in template
                    }));

                    this.dataSource.data = this.ELEMENT_DATA;
                } else {
                    // this.toastr.error('Failed to load Contact', 'Failed');
                    console.error('Failed to load contact:', response?.message);
                }
            },
            error: (error) => {
                console.error('API error:', error);
            },
        });
    }

    getRemainingSeats(): number {
        if (!this.taskSchool) return 0;
        return Math.max(this.taskSchool.strength - this.contactCount, 0);
    }

    onActivityChange(event: any, select: any) {
        console.log('Selected activities:', event.value);

        const formData = new FormData();
        formData.append('activity', event.value);

        this.taskService.updateTask(formData, this.taskId).subscribe({
            next: (response) => {
                if (response.success) {
                    select.close();
                    this.loadTaskDetails();

                    this.toastr.success(
                        'Activity Updated successfully',
                        'Success'
                    );
                    console.log('✅ Activity Updated successfully');
                } else {
                    this.isSubmitting = false;

                    this.toastr.error(
                        response.message || 'Failed to Update Activity.',
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

    // onToggle(event: MatSlideToggleChange) {
    //     if (event.checked) {
    //         console.log('Toggle ON');

    //         this.startTracking(); // Example function
    //         this.updateForTracking('true');
    //     } else {
    //         console.log('Toggle OFF');

    //         this.stopTracking(); // Example function
    //         this.updateForTracking('false');
    //     }
    // }

    // startTracking() {
    //     console.log('Tracking Started');

    //     this.socketService.startTracking(this.taskId);
    // }

    // stopTracking() {
    //     console.log('Tracking Ended');

    //     this.socketService.stopTracking();
    // }
}

interface Expense {
    date: string;
    start_point: string;
    end_point: string;
    kilometer: number;
    food_expence: number;
    other_expence: number;
    action:any;
}

interface Expence {
  date: string;
  food_expence: number;
  other_expence: number;
  totalKm: number;
  totalTravelExp: number;
  grandTotal: number;
  details: { start_point: string; end_point: string; kilometer: number; travel_expence: number }[];
}

interface Students {
    student_name: string;
    student_phone: string;
}

export interface PeriodicElement {
    id: any;
    date: string;
    start_point: any;
    end_point: string;
    kilometer: string;
    travel_expence: string;

    food_expence: string;
    other_expence: number;

    total: Number;
    action: any;
}
