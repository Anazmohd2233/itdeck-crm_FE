import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
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
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../services/student.services';

@Component({
    selector: 'app-students',
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
    ],
    templateUrl: './students.component.html',
    styleUrl: './students.component.scss',
})
export class StudentsComponent {
    ELEMENT_DATA: PeriodicElement[] = [];

    page: number = 1;
    students: any;

    displayedColumns: string[] = [
        // 'select',
        'studentID',
        'name',
        'email',
        'phone',
        'createdDate',
        'courses',
        'lead_source',
        'status',
        'action',
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
            row.name + 1
        }`;
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    constructor(
        public themeService: CustomizerSettingsService,
        private snackBar: MatSnackBar,
        private toastr: ToastrService,
        private studentService: StudentService,
        private router: Router
    ) {}

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    link: string = 'https://iprulers-crm.vercel.app/student-registration';

    copyToClipboard(input: HTMLInputElement) {
        input.select();
        document.execCommand('copy');
        this.snackBar.open('Link copied to clipboard!', 'Close', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }

    ngOnInit(): void {
        this.getStudentList();
    }

    private getStudentList(): void {
        console.log('********getting student*******');
        this.studentService.getStudent(this.page).subscribe({
            next: (response) => {
                if (response && response.success) {
                    const students = response.data?.customer || [];

                    this.ELEMENT_DATA = students.map((u: any) => ({
                        id: u.id,
                        studentID: u.unique_id || 'N/A',
                        name: u.customer_name || 'N/A',
                        email: u.email || 'N/A',
                        lead_source: u.lead_source || 'N/A',
                        phone: u.phone || '-',
                        courses: u.courses.service_name || '-',
                        createdDate: u.created_date || '-',
                        status: u.status,
                        action: '', // we will handle icons directly in template
                    }));

                    console.log('this.ELEMENT_DATA', this.ELEMENT_DATA);

                    this.dataSource.data = this.ELEMENT_DATA;
                } else {
                    // this.toastr.error('Failed to load students', 'Error');
                    console.error(
                        'Failed to load students:',
                        response?.message
                    );
                }
            },
            error: (error) => {
                // this.toastr.error('Error loading students', 'Error');
                console.error('API error:', error);
            },
        });
    }

    // editStudent(id: number) {
    //     this.router.navigate(['/edit-student', id]);
    // }
}

export interface PeriodicElement {
    id: any;
    studentID: string;
    name: any;
    email: string;
    phone: string;
    createdDate: any;
    courses: string;
    lead_source: string;
    status: any;
    action: any;
}
