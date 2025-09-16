import { NgFor, NgIf } from '@angular/common';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../services/student.services';
import { environment } from '../../../environments/environment';
import { SchoolService } from '../../services/school.service';
import { HttpParams } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';

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
    ],
    templateUrl: './students.component.html',
    styleUrl: './students.component.scss',
})
export class UserLocationComponent {
    ELEMENT_DATA: PeriodicElement[] = [];

    page: number = 1;
    pageSize: number = 20;
    totalRecords: number = 0;
    students: any;
    searchField: string = ''; // Initialize the property
    searchFieldLocation: string = '';
    location: any;

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
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getSchooltList();
        this.getLocationList();
    }

    ngAfterViewInit() {
        // listen to paginator changes
        console.log('**********page changed**********');
        this.paginator.page.subscribe((event) => {
            this.page = event.pageIndex + 1; // MatPaginator is 0-based, API is 1-based
            this.pageSize = event.pageSize;
            this.getSchooltList();
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
            row.school_name + 1
        }`;
    }

    // Search Filter
    applyFilter() {
        // const filterValue = (event.target as HTMLInputElement).value;
        // this.dataSource.filter = filterValue.trim().toLowerCase();

        let params = new HttpParams().set('search', this.searchField);
        this.getSchooltList(params);
    }

    applySearch(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        // this.dataSource.filter = filterValue.trim().toLowerCase();

        let params = new HttpParams().set('search', filterValue);
        this.getSchooltList(params);
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
        this.getSchooltList();

        this.searchField = ''; // Clear the input by setting the property to an empty string
    }

    private getSchooltList(params?: any): void {
        this.schoolService.getSchool(this.page, params).subscribe({
            next: (response) => {
                if (response && response.success) {
                    this.totalRecords = response.data?.total;

                    const location = response.data?.school || [];

                    this.ELEMENT_DATA = location.map((u: any) => ({
                        id: u.id,
                        school_name: u.school_name || 'N/A',
                        location: u?.location?.name || 'N/A',
                        type: u.type || 'N/A',
                        strength: u.strength || 'N/A',
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

    filterLocation(event: any) {
        console.log('***event***', event.value);

        let params = new HttpParams();

        params = params.set('location', event.value);

        this.getSchooltList(params);
    }
    searchLocation() {
        console.log('location search keyword', this.searchFieldLocation);
        this.getLocationList(this.searchFieldLocation);
    }
    clearSearchLocation() {
        this.searchFieldLocation = ''; // Clear the input by setting the property to an empty string
        this.getLocationList();
    }

    private getLocationList(search?: any): void {
        let params = new HttpParams().set('status', true);

        if (search) {
            params = params.set('search', search);
        }

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

    filterStatus(event: any) {
        console.log('***event***', event.value);

        let params = new HttpParams();

        params = params.set('type', event.value);

        this.getSchooltList(params);
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
