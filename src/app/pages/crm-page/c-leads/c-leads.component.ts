import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewLeadsComponent } from './new-leads/new-leads.component';
import { ActiveLeadsComponent } from './active-leads/active-leads.component';
import { RevenueGrowthComponent } from './revenue-growth/revenue-growth.component';
import { MatCardModule } from '@angular/material/card';
import { LeadConversionComponent } from './lead-conversion/lead-conversion.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButtonModule } from '@angular/material/button';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CLeadKanbanComponent } from '../c-lead-kanban/c-lead-kanban.component';
import { LeadsService } from '../../../services/lead.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-c-leads',
    imports: [
        RouterLink,
        MatCardModule,
        NewLeadsComponent,
        ActiveLeadsComponent,
        LeadConversionComponent,
        RevenueGrowthComponent,
        MatTabsModule,
        MatIconModule,
        MatTooltipModule,
        MatCheckboxModule,
        NgIf,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        CLeadKanbanComponent,
    ],
    templateUrl: './c-leads.component.html',
    styleUrl: './c-leads.component.scss',
})
export class CLeadsComponent {
    ELEMENT_DATA: PeriodicElement[] = [];

    page: number = 1;
    leads: any;

    displayedColumns: string[] = [
        'select',
        'contact_id',
        'customer_name',
        'email',
        'phone',
        'assign_to',
        'created_date',
        'courses',
        'status',
        'lead_source',
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
            row.customer_name + 1
        }`;
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    constructor(
        public themeService: CustomizerSettingsService,
        private leadsService: LeadsService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.getLeadsList();
    }

    private getLeadsList(): void {
        this.leadsService.getLead(this.page).subscribe({
            next: (response) => {
                if (response && response.success) {
                    const leads = response.data?.leads || [];

                    this.ELEMENT_DATA = leads.map((u: any) => ({
                        id: u.id,
                        contact_id: u.unique_id || 'N/A',

                        customer_name: u.contact_name || 'N/A',
                        email: u.email || 'N/A',
                        phone: u.phone || '-',

                        lead_source: u.lead_source || 'N/A',

                        courses: u.courses.service_name || '-',
                        created_date: u.created_date || 'N/A',

                        assign_to: u.assign_to || 'N/A',

                        status: u.status,
                        action: '', // we will handle icons directly in template
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

export interface PeriodicElement {
    contact_id: string;
    customer_name: any;
    email: string;
    phone: string;
    assign_to: any;
    created_date: string;
    courses: string;
    status: any;
    lead_source: any;
    action: any;
}
