import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-c-deals',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, MatCheckboxModule],
    templateUrl: './c-deals.component.html',
    styleUrl: './c-deals.component.scss'
})
export class CDealsComponent {

    displayedColumns: string[] = ['select', 'dealID', 'companyName', 'contactPerson', 'amount', 'stage', 'probability', 'closeDate', 'createdAt', 'dueDate'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
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
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.companyName + 1}`;
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        dealID: '#951',
        companyName: 'Tech Solutions',
        contactPerson: 'Shawn Kennedy',
        amount: '$25,000.00',
        stage: 'Proposal',
        probability: '80%',
        closeDate: '15 Nov, 2024',
        createdAt: 'Nov 08, 2024 10:30 AM',
        dueDate: 'Nov 15, 2024 10:45 AM'
    },
    {
        dealID: '#587',
        companyName: 'Acma Industries',
        contactPerson: 'Roberto Cruz',
        amount: '$15,000.00',
        stage: 'Presentation',
        probability: '50%',
        closeDate: '14 Nov, 2024',
        createdAt: 'Nov 09, 2024 02:15 PM',
        dueDate: 'Nov 14, 2024 02:30 PM'
    },
    {
        dealID: '#618',
        companyName: 'Synergy Ltd',
        contactPerson: 'Juli Johnson',
        amount: '$30,000.00',
        stage: 'Negotiation',
        probability: '75%',
        closeDate: '13 Nov, 2024',
        createdAt: 'Nov 10, 2024 09:45 AM',
        dueDate: 'Nov 13, 2024 10:00 AM'
    },
    {
        dealID: '#367',
        companyName: 'Tech Enterprises',
        contactPerson: 'Catalina Engles',
        amount: '$20,000.00',
        stage: 'Discovery',
        probability: '90%',
        closeDate: '12 Nov, 2024',
        createdAt: 'Nov 11, 2024 03:45 PM',
        dueDate: 'Nov 12, 2024 04:00 PM'
    },
    {
        dealID: '#761',
        companyName: 'Synetic Solutions',
        contactPerson: 'Louis Nagle',
        amount: '$40,000.00',
        stage: 'Contract Sent',
        probability: '60%',
        closeDate: '11 Nov, 2024',
        createdAt: 'Nov 12, 2024 01:00 PM',
        dueDate: 'Nov 11, 2024 01:15 PM'
    },
    {
        dealID: '#761',
        companyName: 'GlobalTech Solutions',
        contactPerson: 'Patrick Madsen',
        amount: '$50,000.00',
        stage: 'Proposal',
        probability: '55%',
        closeDate: '10 Nov, 2024',
        createdAt: 'Nov 13, 2024 01:00 PM',
        dueDate: 'Nov 10, 2024 01:15 PM'
    },
    {
        dealID: '#761',
        companyName: 'Quantum Solutions',
        contactPerson: 'Lillian McCreary',
        amount: '$45,000.00',
        stage: 'Negotiation',
        probability: '79%',
        closeDate: '09 Nov, 2024',
        createdAt: 'Nov 14, 2024 01:00 PM',
        dueDate: 'Nov 09, 2024 01:15 PM'
    },
    {
        dealID: '#761',
        companyName: 'Synetic Pinnacle Ltd',
        contactPerson: 'Beverly Caulkins',
        amount: '$35,000.00',
        stage: 'Presentation',
        probability: '85%',
        closeDate: '08 Nov, 2024',
        createdAt: 'Nov 15, 2024 01:00 PM',
        dueDate: 'Nov 08, 2024 01:15 PM'
    },
    {
        dealID: '#542',
        companyName: 'IT Solutions',
        contactPerson: 'Alina Smith',
        amount: '$23,423.00',
        stage: 'Proposal',
        probability: '11%',
        closeDate: '07 Nov, 2024',
        createdAt: 'Nov 08, 2024 10:30 AM',
        dueDate: 'Nov 15, 2024 10:45 AM'
    },
    {
        dealID: '#453',
        companyName: 'Daxa Admin',
        contactPerson: 'David Warner',
        amount: '$12,421.00',
        stage: 'Discovery',
        probability: '53%',
        closeDate: '06 Nov, 2024',
        createdAt: 'Nov 07, 2024 10:30 AM',
        dueDate: 'Nov 14, 2024 10:45 AM'
    }
];

export interface PeriodicElement {
    dealID: string;
    companyName: string;
    contactPerson: string;
    amount: string;
    stage: string;
    probability: string;
    closeDate: string;
    createdAt: string;
    dueDate: string;
}