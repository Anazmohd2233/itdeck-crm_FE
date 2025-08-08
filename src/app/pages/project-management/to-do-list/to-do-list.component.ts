import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-to-do-list:not(p)',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, MatTableModule, NgIf, MatCheckboxModule, MatTooltipModule, MatSelectModule, MatInputModule, MatDatepickerModule],
    templateUrl: './to-do-list.component.html',
    styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {

    displayedColumns: string[] = ['select', 'taskID', 'taskDescription', 'assignedTo', 'dueDate', 'priority', 'status', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

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
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.taskID + 1}`;
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    // Popup Trigger
    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        taskID: '#951',
        taskDescription: 'Hotel management system',
        assignedTo: 'Shawn Kennedy',
        dueDate: '15 Nov, 2024',
        priority: 'High',
        status: {
            inProgress: 'In Progress',
            // pending: 'Pending',
            // completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        taskID: '#587',
        taskDescription: 'Send proposal to APR Ltd',
        assignedTo: 'Roberto Cruz',
        dueDate: '14 Nov, 2024',
        priority: 'Medium',
        status: {
            // inProgress: 'In Progress',
            pending: 'Pending',
            // completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        taskID: '#618',
        taskDescription: 'Python upgrade',
        assignedTo: 'Juli Johnson',
        dueDate: '13 Nov, 2024',
        priority: 'High',
        status: {
            // inProgress: 'In Progress',
            // pending: 'Pending',
            completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        taskID: '#367',
        taskDescription: 'Schedule meeting with Daxa',
        assignedTo: 'Catalina Engles',
        dueDate: '12 Nov, 2024',
        priority: 'Low',
        status: {
            // inProgress: 'In Progress',
            // pending: 'Pending',
            // completed: 'Completed',
            notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        taskID: '#761',
        taskDescription: 'Engineering lite touch',
        assignedTo: 'Louis Nagle',
        dueDate: '11 Nov, 2024',
        priority: 'Medium',
        status: {
            inProgress: 'In Progress',
            // pending: 'Pending',
            // completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    }
];

export interface PeriodicElement {
    taskDescription: string;
    taskID: string;
    assignedTo: string;
    dueDate: string;
    priority: string;
    status: any;
    action: any;
}