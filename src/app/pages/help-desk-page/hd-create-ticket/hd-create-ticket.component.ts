import {
    Component,
    Inject,
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
import { TaskActivity } from '../../../services/enums';
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
    ],
    templateUrl: './hd-create-ticket.component.html',
    styleUrls: ['./hd-create-ticket.component.scss'],
})
export class HdCreateTicketComponent {
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
        'food_expence',
        'total',

        // 'action',
    ];
     dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
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

    isSubmitting = false;
    users: any;
        school: any;

    page: number = 1;
    TaskActivity = TaskActivity;
    taskActivityValues = Object.values(TaskActivity);
    taskId: string | null = null; // 👈 Store the ID here
    editMode: boolean = false;
    taskData: any;
    dialogRef!: MatDialogRef<any>; // store reference

    @ViewChild('taskDialog') taskDialog!: TemplateRef<any>;

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
                private schoolService: SchoolService,

    ) {
        this.initializeForm();
        this.initializeExpenceForm();
    }

    ngOnInit(): void {
        //  this.getExpenceList();
        this.getUserList();
        this.getSchoolList();

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

    private initializeForm(): void {
        this.taskForm = this.formBuilder.group({
            task_title: ['', [Validators.required, Validators.minLength(3)]],
            activity: [[]],
            priority: ['', Validators.required],
            assigned_to: ['', Validators.required],
            due_date: ['', Validators.required],
            due_time: [''],
            note: [''],
            taskImage: [''],
            // location: [''],
            school_name: [[]],
                        school_name_edit: [''],

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
    get task_title() {
        return this.taskForm.get('task_title');
    }
    get task_type() {
        return this.taskForm.get('task_type');
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

    loadTaskDetails() {
        this.taskService.getTaskById(this.taskId).subscribe({
            next: (response) => {
                if (response.success) {
                    this.taskData = response.task;
                    const task = response.task;
                   const expence= response.task.expence;


                    // ✅ Patch form values
                    this.taskForm.patchValue({
                        task_title: task.task_title,
                        priority: task.priority,
                        assigned_to: task.assigned_to.id,
                        due_date: task.due_date,
                        note: task.note,
                        taskImage: task.task_image_url,
                        school_name_edit: task?.school?.id,
                    });


                    this.ELEMENT_DATA = expence.map((u: any) => ({
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
                    console.log('Customer not found.');
                    // this.toastr.error('Customer not found.', 'Error');
                }
            },
            error: (err) => {
                console.error('❌ Error loading contact:', err);
                this.toastr.error('Failed to load contact details.', 'Error');
            },
        });
    }

    createExpence(): void {
        if (this.expenceForm.valid) {
            // Cast your form value to correct type
            const expenses: Expense[] = this.expenceForm.value.expenses;

            const payload = {
                task_id: this.taskId,
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

    openDialog() {
        this.initializeExpenceForm();
        this.dialogRef = this.dialog.open(this.taskDialog, {
            width: '85%',
            maxWidth: '100vw', // prevents overflow
        });
    }

    closeDialog() {
        if (this.dialogRef) {
            this.dialogRef.close();
        }
    }

    // component.ts
    initializeExpenceForm(): void {
        this.expenceForm = this.formBuilder.group({
            expenses: this.formBuilder.array([this.createExpenseGroup()]),
        });
    }

    createExpenseGroup(): FormGroup {
        return this.formBuilder.group({
            date: ['', Validators.required],
            start_point: ['', Validators.required],
            end_point: ['', Validators.required],
            kilometer: ['', Validators.required],
            food_expence: ['', Validators.required],
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
}

interface Expense {
    date: string;
    start_point: string;
    end_point: string;
    kilometer: number;
    food_expence: number;
}

export interface PeriodicElement {
    id: any;
    date: string;
    start_point: any;
    end_point: string;
    kilometer: string;
    food_expence: string;
    total: Number;
    // action: any;
}

