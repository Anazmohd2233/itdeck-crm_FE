import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { PaidCoursesComponent } from './paid-courses/paid-courses.component';
import { FreeCoursesComponent } from './free-courses/free-courses.component';
import { TopRatedCoursesComponent } from './top-rated-courses/top-rated-courses.component';
import { BestSellerCoursesComponent } from './best-seller-courses/best-seller-courses.component';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../../services/course.service';
import { CLeadKanbanComponent } from '../../crm-page/c-lead-kanban/c-lead-kanban.component';
import { NgIf } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { RevenueGrowthComponent } from '../../crm-page/c-leads/revenue-growth/revenue-growth.component';

@Component({
    selector: 'app-l-courses',
    imports: [
        RouterLink,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        MatTabsModule,
        AllCoursesComponent,
        PaidCoursesComponent,
        FreeCoursesComponent,
        TopRatedCoursesComponent,
        // BestSellerCoursesComponent,
         RouterLink,
        MatCardModule,
       
        MatTabsModule,
        MatIconModule,
        MatTooltipModule,
        MatCheckboxModule,
        NgIf,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        // CLeadKanbanComponent,
    ],
    templateUrl: './l-courses.component.html',
    styleUrl: './l-courses.component.scss',
})
export class LCoursesComponent {
    ELEMENT_DATA: PeriodicElement[] = [];

    page: number = 1;
    leads: any;

    displayedColumns: string[] = [
        'service_name',
        'description',
        'price',
        'start_date',
        'end_date',
        'category',
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
            row.service_name + 1
        }`;
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    constructor(
        public themeService: CustomizerSettingsService,
        private courseService: CourseService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.getCourseList();
    }

    private getCourseList(): void {
        this.courseService.getCourse(this.page).subscribe({
            next: (response) => {
                if (response && response.success) {
                    const leads = response.data?.services || [];

                    this.ELEMENT_DATA = leads.map((u: any) => ({
                        id:u.id,
                        service_name: u.service_name || 'N/A',

                        description: u.description || 'N/A',
                        price: u.price || 'N/A',
                        status: u.status || '-',

                        start_date: u.start_date || 'N/A',

                        end_date: u.end_date || '-',
                        category: u.category || 'N/A',

                        action: '', // we will handle icons directly in template
                    }));

                    this.dataSource.data = this.ELEMENT_DATA;
                } else {
                    // this.toastr.error('Failed to load Contact', 'Failed');
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
    service_name: string;
    description: any;
    price: string;
    start_date: Date;
    end_date: Date;
    category: string;
    status: string;
}
