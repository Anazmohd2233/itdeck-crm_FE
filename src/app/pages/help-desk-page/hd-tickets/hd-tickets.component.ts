import { NgIf } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { TicketsOpenComponent } from '../../../dashboard/help-desk/tickets-open/tickets-open.component';
import { TicketsInProgressComponent } from '../../../dashboard/help-desk/tickets-in-progress/tickets-in-progress.component';
import { TicketsResolvedComponent } from '../../../dashboard/help-desk/tickets-resolved/tickets-resolved.component';
import { TicketsClosedComponent } from '../../../dashboard/help-desk/tickets-closed/tickets-closed.component';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskService } from '../../../services/task.service';
import { HttpParams } from '@angular/common/http';

@Component({
    selector: 'app-hd-tickets',
    imports: [RouterLink, TicketsOpenComponent, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatSelectModule, TicketsInProgressComponent, TicketsResolvedComponent, TicketsClosedComponent, MatCardModule, MatMenuModule, MatButtonModule, MatTableModule, MatPaginatorModule, NgIf, MatTooltipModule, MatProgressBarModule],
    templateUrl: './hd-tickets.component.html',
    styleUrls: ['./hd-tickets.component.scss']
})
export class HdTicketsComponent implements OnInit {

    displayedColumns: string[] = ['ticketID', 'title', 'type', 'priority',  'createdDate', 'dueDate','status', 'action'];
    dataSource = new MatTableDataSource<TaskElement>();
    isLoading = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    createdDateFilter: Date | null = null;
    dueDateFilter: Date | null = null;
    priorityFilter: string = '';
    statusFilter: string = '';
    page = 1;

    constructor(
        public themeService: CustomizerSettingsService,
        private taskService: TaskService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadTasks();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    loadTasks(): void {
        this.isLoading = true;
        this.taskService.getTasks(this.page).subscribe({
            next: (response: any) => {
                // Map API response to TaskElement format
                const tasks = response.data?.tasks?.map((task: any) => this.mapApiTaskToElement(task)) || [];
                this.dataSource.data = tasks;
                this.dataSource.filterPredicate = this.customFilterPredicate();
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading tasks:', error);
                console.error('Error details:', error.error);
                console.error('Error status:', error.status);
                console.error('Error URL:', error.url);
                this.isLoading = false;
                // Fallback to mock data for now
                // this.dataSource.data = ELEMENT_DATA;
                this.dataSource.filterPredicate = this.customFilterPredicate();
            }
        });
    }

    private mapApiTaskToElement(task: any): TaskElement {
        // Use placeholder image service for missing images
        const defaultAvatar = 'https://via.placeholder.com/40x40/007bff/ffffff?text=U';

        return {
            id:task.id,
            ticketID: `#${task.id || 'N/A'}`,
            title: task.task_title || 'No Title',
            type:task.task_type,
            createdDate: task.created_at ? new Date(task.created_at).toLocaleDateString() : 'N/A',
            dueDate: task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A',
            priority: task.priority || 'Medium',
          
            status:task.status,
            action: {
                view: 'visibility',
                delete: 'delete'
            }
        };
    }

 

    filterCreatedDate(event: any) {
        this.createdDateFilter = event.value;
        this.applyAllFilters();
    }
  
    filterDueDate(event: any) {
        this.dueDateFilter = event.value;
        this.applyAllFilters();
    }
  
    filterPriority(event: any) {
        this.priorityFilter = event.value;
        this.applyAllFilters();
    }
  
    applyAllFilters() {
        this.dataSource.filter = '' + Math.random(); // Trigger table refresh
    }
  
    customFilterPredicate() {
        return (data: TaskElement, filter: string): boolean => {
            let matchesCreatedDate = true;
            let matchesDueDate = true;
            let matchesPriority = true;
            let matchesStatus = true;
  
            if (this.createdDateFilter) {
                matchesCreatedDate = new Date(data.createdDate).toDateString() === this.createdDateFilter.toDateString();
            }
  
            if (this.dueDateFilter) {
                matchesDueDate = new Date(data.dueDate).toDateString() === this.dueDateFilter.toDateString();
            }
  
            if (this.priorityFilter) {
                matchesPriority = data.priority === this.priorityFilter;
            }

            if (this.statusFilter) {
                // Check data.status object
                matchesStatus = Object.values(data.status).includes(this.statusFilter);
            }

            return matchesCreatedDate && matchesDueDate && matchesPriority && matchesStatus;
        };
    }

    filterStatus(event: any) {
        this.statusFilter = event.value;
        this.applyAllFilters();
    }

    resetFilters() {
        this.createdDateFilter = null;
        this.dueDateFilter = null;
        this.priorityFilter = '';
        this.statusFilter = '';
        this.applyAllFilters();
    }
  

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        console.log('filterValue => ???? ',filterValue.trim().toLowerCase())
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    viewTask(ticketId: string): void {
        // Extract numeric ID from ticketId (remove # prefix)
        const taskId = ticketId.replace('#', '');
        console.log('Viewing task:', taskId);
        // Navigate to task details page
        this.router.navigate(['/task/ticket-details', taskId]);
    }

    editTask(ticketId: string): void {
        // Extract numeric ID from ticketId (remove # prefix)
        const taskId = ticketId.replace('#', '');
        console.log('Editing task:', taskId);
        // Navigate to task edit page
        this.router.navigate(['/task/edit-ticket', taskId]);
    }


}



export interface TaskElement {
    id:any;
    ticketID: string;
    title: string;
    type: any;
        priority: string;
    createdDate: string;
    dueDate: string;
   status: any;
    action: any;

   
}

