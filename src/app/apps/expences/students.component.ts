import { formatDate, NgFor, NgIf } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {
    FormArray,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../services/student.services';
import { environment } from '../../../environments/environment';
import { SchoolService } from '../../services/school.service';
import { HttpParams } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { TaskService } from '../../services/task.service';
import {
    MatDialog,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-user-location',
    imports: [
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        MatTableModule,
        MatPaginatorModule,
        NgIf,
        MatCheckboxModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
        FormsModule, // ✅ needed for [(ngModel)]
        MatSelectModule,
        NgFor,
        GoogleMapsModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    templateUrl: './students.component.html',
    styleUrl: './students.component.scss',
})
export class ExpencesComponent {
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
    ELEMENT_DATA: PeriodicElement[] = [];
    @ViewChild('taskDialog') taskDialog!: TemplateRef<any>;

    expenceForm!: FormGroup;

  page: number = 1;
    pageSize: number = 20;
    totalRecords: number = 0;
    students: any;
    searchField: string = ''; // Initialize the property
    searchFieldLocation: string = '';
    location: any;
    liveLocation: any;
    isSubmitting = false;
    profile: any;
    createdDateFilter: Date | null = null;
    users: any;
    searchFieldUser: string = '';
    user_type: any;

    filterCreatedDateValue: any;
filterUserValue: any;

    dialogRef!: MatDialogRef<any>; // store reference

    @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

    zoom = 14;
    center: google.maps.LatLngLiteral = { lat: 11.259007, lng: 75.792014 }; // default
    markers: any[] = [];
    path: google.maps.LatLngLiteral[] = [];
    displayedColumns: string[] = [
        // 'select',

        'school_name',
        'location',
        'type',
        'strength',
        'status',
        'action',
    ];
    dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        public themeService: CustomizerSettingsService,
        private snackBar: MatSnackBar,
        private toastr: ToastrService,
        private schoolService: SchoolService,
        private taskService: TaskService,
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private usersService: UsersService,

        private router: Router
    ) {}

    ngOnInit(): void {
        this.user_type = localStorage.getItem('user_type');

        this.getProfile();
        this.getUserList();

        this.getExpenceList();
        this.initializeExpenceForm();
    }
    private getProfile(): void {
        this.usersService.getProfile().subscribe({
            next: (response) => {
                if (response && response.success) {
                    this.profile = response.data || [];
                } else {
                    // this.toastr.error('Failed to load users', 'Failed');
                    console.error('Failed to load profile:', response?.message);
                }
            },
            error: (error) => {
                console.error('API error:', error);
            },
        });
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
    searchUser() {
        console.log('user search keyword', this.searchFieldUser);
        this.getUserList(this.searchFieldUser);
    }

    clearSearchUser() {
        this.searchFieldUser = ''; // Clear the input by setting the property to an empty string
        this.getUserList();
    }
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: PeriodicElement): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
            row.school_name + 1
        }`;
    }


       resetFilters() {
        this.createdDateFilter = null;
        this.filterCreatedDateValue = null;

        this.getExpenceList();
    }

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    copyToClipboard(input: HTMLInputElement) {
        input.select();
        document.execCommand('copy');
        this.snackBar.open('Link copied to clipboard!', 'Close', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }

    clearSearch() {
        this.searchField = ''; // Clear the input by setting the property to an empty string
    }
      ngAfterViewInit() {
        // listen to paginator changes
        console.log('**********page changed**********');
        this.paginator.page.subscribe((event) => {
            this.page = event.pageIndex + 1; // MatPaginator is 0-based, API is 1-based
            this.pageSize = event.pageSize;
            this.getExpenceList();
        });
    }

    private getExpenceList(): void {
          let params = new HttpParams();

  if (this.filterCreatedDateValue) params = params.set('date', this.filterCreatedDateValue);
  if (this.filterUserValue) params = params.set('userId', this.filterUserValue);

        this.taskService.getExpences(this.page, params).subscribe({
            next: (response) => {
                if (response && response.success) {
                                    this.totalRecords = response.data?.total;

                    this.expenceDataSource.data = response.data?.expences || [];

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
    toggleExpand(element: Expence) {
        this.expandedElement =
            this.expandedElement === element ? null : element;
    }

    applyExpenceFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.expenceDataSource.filter = filterValue.trim().toLowerCase();
    }

    openDialog(templateRef: TemplateRef<any>): void {
        this.initializeExpenceForm();
        this.dialogRef = this.dialog.open(templateRef, {
            width: '85%',
            maxWidth: '100vw',
        });
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

    createExpenseGroup(): FormGroup {
        return this.formBuilder.group({
            start_point: ['', Validators.required],
            end_point: ['', Validators.required],
            kilometer: ['', Validators.required],
        });
    }

    createExpence(): void {
        if (this.expenceForm.valid) {
            // Cast your form value to correct type
            const expenses: Expense[] = this.expenceForm.value.expenses;

            const payload = {
                user_id: this.profile?.id,
                date: this.expenceForm.value.date,
                food_expence: this.expenceForm.value.food_expence,
                other_expence: this.expenceForm.value.other_expence,
                expenses: expenses.map((exp: Expense) => ({
                    ...exp,
                })),
            };

            console.log('payload', JSON.stringify(payload));

            this.isSubmitting = true;

            this.taskService.createExpence(payload).subscribe({
                next: (response) => {
                    if (response.success) {
                        this.getExpenceList();
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
            console.log('form not valid');
        }
    }

    closeDialog() {
        if (this.dialogRef) {
            this.dialogRef.close();
        }
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

// Filters
filterCreatedDate(event: any) {
  if (event.value) {
    this.filterCreatedDateValue = formatDate(event.value, 'yyyy-MM-dd', 'en-US');
    this.getExpenceList();
  }
}

filterUser(event: any) {
  this.filterUserValue = event.value;
  this.getExpenceList();
}
}

export interface PeriodicElement {
    id: any;
    school_name: any;
    location: any;
    type: any;
    strength: any;
    status: any;
    action: any;
}

interface Expence {
    date: string;
    food_expence: number;
    other_expence: number;
    totalKm: number;
    totalTravelExp: number;
    grandTotal: number;
    details: {
        start_point: string;
        end_point: string;
        kilometer: number;
        travel_expence: number;
    }[];
}

interface Expense {
    date: string;
    start_point: string;
    end_point: string;
    kilometer: number;
    food_expence: number;
    other_expence: number;
    action: any;
}
