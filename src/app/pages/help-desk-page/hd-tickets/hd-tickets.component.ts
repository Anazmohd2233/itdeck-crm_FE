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

    displayedColumns: string[] = ['ticketID', 'subject', 'contact','status', 'priority', 'requester', 'assignedAgents', 'createdDate', 'dueDate', 'action'];
    dataSource = new MatTableDataSource<TaskElement>();
    isLoading = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    createdDateFilter: Date | null = null;
    dueDateFilter: Date | null = null;
    priorityFilter: string = '';
    statusFilter: string = '';

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
        // For now, using mock data - will integrate API later
        this.taskService.getTasks(1).subscribe({
            next: (response: any) => {
                // Map API response to TaskElement format
                const tasks = response.data ? response.data.map((task: any) => this.mapApiTaskToElement(task)) : [];
                this.dataSource.data = tasks;
                this.dataSource.filterPredicate = this.customFilterPredicate();
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading tasks:', error);
                this.isLoading = false;
                // Fallback to mock data for now
                this.dataSource.data = ELEMENT_DATA;
                this.dataSource.filterPredicate = this.customFilterPredicate();
            }
        });
    }

    private mapApiTaskToElement(task: any): TaskElement {
        return {
            ticketID: `#${task.id || 'N/A'}`,
            subject: task.task_title || 'No Title',
            contact: {
                img: task.contact?.avatar || 'images/users/default.jpg',
                name: task.contact?.name || 'Unknown Contact'
            },
            createdDate: task.created_at ? new Date(task.created_at).toLocaleDateString() : 'N/A',
            dueDate: task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A',
            requester: task.created_by?.name || 'System',
            priority: task.priority || 'Medium',
            assignedAgents: {
                img1: task.assigned_user?.avatar || 'images/users/default.jpg'
            },
            status: this.mapTaskStatus(task.status),
            action: {
                view: 'visibility',
                delete: 'delete'
            }
        };
    }

    private mapTaskStatus(status: string): any {
        const statusMap: any = {
            'open': { open: 'Open' },
            'in_progress': { inProgress: 'In Progress' },
            'pending': { pending: 'Pending' },
            'completed': { closed: 'Completed' },
            'closed': { closed: 'Closed' }
        };
        return statusMap[status?.toLowerCase()] || { open: 'Open' };
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

    viewTask(taskId: string) {
        // Extract numeric ID from ticket ID (remove # prefix)
        const numericTaskId = parseInt(taskId.replace('#', ''));
        const params = new HttpParams()
            .set('search', taskId)
            .set('status', 'all');
        
        this.taskService.getTaskById(numericTaskId, params).subscribe({
            next: (response: any) => {
                console.log('Task details:', response);
                // Navigate to task details page or show modal
                this.router.navigate(['/task/view', numericTaskId]);
            },
            error: (error) => {
                console.error('Error loading task details:', error);
            }
        });
    }

    deleteTask(taskId: string) {
        const numericTaskId = parseInt(taskId.replace('#', ''));
        if (confirm('Are you sure you want to delete this task?')) {
            this.taskService.deleteTask(numericTaskId).subscribe({
                next: () => {
                    console.log('Task deleted successfully');
                    // Reload tasks after deletion
                    this.loadTasks();
                },
                error: (error) => {
                    console.error('Error deleting task:', error);
                }
            });
        }
    }
}

const ELEMENT_DATA: TaskElement[] = [
    {
        ticketID: '#951',
        subject: 'Login Issues',
        contact: {
            img: 'images/users/user15.jpg',
            name: 'Marcia Baker'
        },
        createdDate: '15 Nov, 2024',
        dueDate: '15 Dec, 2024',
        requester: 'Walter Frazier',
        priority: 'High',
        assignedAgents: {
            img1: 'images/users/user5.jpg',
            img2: 'images/users/user13.jpg'
        },
        status: {
            inProgress: 'In Progress',
            // pending: 'Pending',
            // open: 'Open',
            // closed: 'Closed',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        ticketID: '#547',
        subject: 'Email Configuration',
        contact: {
            img: 'images/users/user7.jpg',
            name: 'Carolyn Barnes'
        },
        createdDate: '14 Nov, 2024',
        dueDate: '14 Dec, 2024',
        requester: 'Kimberly Anderson',
        priority: 'Medium',
        assignedAgents: {
            img1: 'images/users/user7.jpg',
            img2: 'images/users/user9.jpg',
            img3: 'images/users/user12.jpg'
        },
        status: {
            // inProgress: 'In Progress',
            pending: 'Pending',
            // open: 'Open',
            // closed: 'Closed',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        ticketID: '#658',
        subject: 'Application Error',
        contact: {
            img: 'images/users/user12.jpg',
            name: 'Donna Miller'
        },
        createdDate: '13 Nov, 2024',
        dueDate: '13 Dec, 2024',
        requester: 'Roscoe Guerrero',
        priority: 'High',
        assignedAgents: {
            img1: 'images/users/user16.jpg',
            img2: 'images/users/user17.jpg'
        },
        status: {
            // inProgress: 'In Progress',
            // pending: 'Pending',
            open: 'Open',
            // closed: 'Closed',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        ticketID: '#367',
        subject: 'Software Installation',
        contact: {
            img: 'images/users/user5.jpg',
            name: 'Barbara Cross'
        },
        createdDate: '12 Nov, 2024',
        dueDate: '12 Dec, 2024',
        requester: 'Robert Stewart',
        priority: 'Low',
        assignedAgents: {
            img1: 'images/users/user11.jpg',
            img2: 'images/users/user3.jpg',
            img3: 'images/users/user8.jpg'
        },
        status: {
            // inProgress: 'In Progress',
            // pending: 'Pending',
            // open: 'Open',
            closed: 'Closed',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
];

export interface TaskElement {
    ticketID: string;
    subject: string;
    contact: any;
    createdDate: string;
    dueDate: string;
    requester: string;
    priority: string;
    assignedAgents: any;
    status: any;
    action: any;
}