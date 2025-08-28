import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { DashboardService } from '../../../services/dashboard.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-recent-leads',
    imports: [
                RouterLink,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        NgIf,
        MatCheckboxModule,
        MatTooltipModule,
    ],
    templateUrl: './recent-leads.component.html',
    styleUrl: './recent-leads.component.scss',
})
export class RecentLeadsComponent {
        ELEMENT_DATA: PeriodicElement[] = [];
        taskData:any;
    
    displayedColumns: string[] = [
        'school_name',
        'location',
        'strength',
        'collected_data',
        'status',
        'assigned_user',
        'created_date',
        'due_date',
        'action',
    ];
    dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngOnInit(): void {
        this.getDashboardView();
    }

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
            row.school_name + 1
        }`;
    }

    constructor(
        public themeService: CustomizerSettingsService,
        private dashboardService: DashboardService
    ) {}

    private getDashboardView(): void {
        this.dashboardService.getDashboardReport(1).subscribe({
            next: (response) => {
                if (response && response.success) {

                       const contacts = response.data?.tasks || [];
                     this.taskData = response.data?.total || contacts.length; 

                    this.ELEMENT_DATA = contacts.map((u: any) => ({

                        
                        id: u.id,
                        school_name: u?.school_name || 'N/A',

                        location: u?.location?.name || 'N/A',

                        strength: u?.strength || 'N/A',
                        collected_data: u?.collected_data,
                        status: u?.status || 'N/A',
                        assigned_user: u?.assigned_user?.name || 'N/A',
                            created_date: u.created_at
                ? new Date(u.created_at).toLocaleDateString()
                : 'N/A',
                        due_date: u?.due_date || 'N/A',
                       action: {
                view: 'visibility',
           
            },
                    }));

                    this.dataSource.data = this.ELEMENT_DATA;
                } else {
                    console.error(
                        'Failed to load dashboard',
                        response?.message
                    );
                }
            },
            error: (error) => {
                console.error('API error:', error);
            },
        });
    }
}



export interface PeriodicElement {
    school_name: any;
    location: any;
    strength: any;
    collected_data: any;
    status: any;
    assigned_user: any;
    created_date: any;
    due_date: any;

    action: any;
}
