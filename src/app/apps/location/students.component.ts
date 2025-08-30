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
import { environment } from '../../../environments/environment';
import { SchoolService } from '../../services/school.service';

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
export class LocationComponent {
    ELEMENT_DATA: PeriodicElement[] = [];

    page: number = 1;
    pageSize: number = 20;
    totalRecords: number = 0;
    students: any;

    displayedColumns: string[] = [
        // 'select',
        'id',
        'name',
        'status',
        'action',
    ];
    dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        // listen to paginator changes
        console.log('**********page changed**********');
        this.paginator.page.subscribe((event) => {
            this.page = event.pageIndex + 1; // MatPaginator is 0-based, API is 1-based
            this.pageSize = event.pageSize;
            this.getLocationtList();
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
        private schoolService: SchoolService,
        private router: Router
    ) {}

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

    ngOnInit(): void {
        this.getLocationtList();
    }

    private getLocationtList(): void {
        this.schoolService.getLocation(this.page).subscribe({
            next: (response) => {
                if (response && response.success) {
                    this.totalRecords = response.data?.total;

                    const location = response.data?.location || [];

                    this.ELEMENT_DATA = location.map((u: any) => ({
                        id: u.id,
                        name: u.name || 'N/A',
                        status: u.status,

                        action: '', // we will handle icons directly in template
                    }));

                    console.log('this.ELEMENT_DATA', this.ELEMENT_DATA);

                    this.dataSource.data = this.ELEMENT_DATA;
                } else {
                    // this.toastr.error('Failed to load students', 'Error');
                    console.error(
                        'Failed to load location:',
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
    name: any;
    status: any;

    action: any;
}
