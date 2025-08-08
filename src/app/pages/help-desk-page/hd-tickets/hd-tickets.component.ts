import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
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

@Component({
    selector: 'app-hd-tickets',
    imports: [RouterLink, TicketsOpenComponent, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatSelectModule, TicketsInProgressComponent, TicketsResolvedComponent, TicketsClosedComponent, MatCardModule, MatMenuModule, MatButtonModule, MatTableModule, MatPaginatorModule, NgIf, MatTooltipModule, MatProgressBarModule],
    templateUrl: './hd-tickets.component.html',
    styleUrl: './hd-tickets.component.scss'
})
export class HdTicketsComponent {

    displayedColumns: string[] = ['ticketID', 'subject', 'contact','status', 'priority', 'requester', 'assignedAgents', 'createdDate', 'dueDate', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    createdDateFilter: Date | null = null;
    dueDateFilter: Date | null = null;
    priorityFilter: string = '';
    statusFilter: string = '';

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.customFilterPredicate();

    }

    constructor(
        public themeService: CustomizerSettingsService
    ) {}


// ngOnInit() {
//     this.dataSource.filterPredicate = this.customFilterPredicate();
//   }
  
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
    return (data: PeriodicElement, filter: string): boolean => {
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

}

const ELEMENT_DATA: PeriodicElement[] = [
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
    // {
    //     ticketID: '#469',
    //     subject: 'System Upgrade',
    //     contact: {
    //         img: 'images/users/user16.jpg',
    //         name: 'Rebecca Block'
    //     },
    //     createdDate: '11 Nov, 2024',
    //     dueDate: '11 Dec, 2024',
    //     requester: 'Dustin Fritch',
    //     priority: 'Medium',
    //     assignedAgents: {
    //         img1: 'images/users/user15.jpg',
    //         img2: 'images/users/user6.jpg'
    //     },
    //     status: {
    //         inProgress: 'In Progress',
    //         // pending: 'Pending',
    //         // open: 'Open',
    //         // closed: 'Closed',
    //     },
    //     action: {
    //         view: 'visibility',
    //         delete: 'delete'
    //     }
    // },

    // {
    //     ticketID: '#431',
    //     subject: 'Network Connectivity',
    //     contact: {
    //         img: 'images/users/user9.jpg',
    //         name: 'Ramiro McCarty'
    //     },
    //     createdDate: '10 Nov, 2024',
    //     dueDate: '10 Dec, 2024',
    //     requester: 'Carol Camacho',
    //     priority: 'Low',
    //     assignedAgents: {
    //         img1: 'images/users/user10.jpg',
    //         img2: 'images/users/user5.jpg'
    //     },
    //     status: {
    //         inProgress: 'In Progress',
    //         // pending: 'Pending',
    //         // open: 'Open',
    //         // closed: 'Closed',
    //     },
    //     action: {
    //         view: 'visibility',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     ticketID: '#547',
    //     subject: 'Vaxo App Design',
    //     contact: {
    //         img: 'images/users/user1.jpg',
    //         name: 'Robert Fairweather'
    //     },
    //     createdDate: '09 Nov, 2024',
    //     dueDate: '09 Dec, 2024',
    //     requester: 'Robert Heinemann',
    //     priority: 'High',
    //     assignedAgents: {
    //         img1: 'images/users/user7.jpg',
    //         img2: 'images/users/user12.jpg',
    //         img3: 'images/users/user16.jpg'
    //     },
    //     status: {
    //         // inProgress: 'In Progress',
    //         pending: 'Pending',
    //         // open: 'Open',
    //         // closed: 'Closed',
    //     },
    //     action: {
    //         view: 'visibility',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     ticketID: '#658',
    //     subject: 'Aoriv AI Design',
    //     contact: {
    //         img: 'images/users/user6.jpg',
    //         name: 'Marcelino Haddock'
    //     },
    //     createdDate: '08 Nov, 2024',
    //     dueDate: '08 Dec, 2024',
    //     requester: 'Jonathan Jones',
    //     priority: 'High',
    //     assignedAgents: {
    //         img1: 'images/users/user17.jpg',
    //         img2: 'images/users/user13.jpg'
    //     },
    //     status: {
    //         // inProgress: 'In Progress',
    //         // pending: 'Pending',
    //         open: 'Open',
    //         // closed: 'Closed',
    //     },
    //     action: {
    //         view: 'visibility',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     ticketID: '#367',
    //     subject: 'Beja Banking Finance',
    //     contact: {
    //         img: 'images/users/user13.jpg',
    //         name: 'Thomas Wilson'
    //     },
    //     createdDate: '07 Nov, 2024',
    //     dueDate: '07 Dec, 2024',
    //     requester: 'David Williams',
    //     priority: 'High',
    //     assignedAgents: {
    //         img1: 'images/users/user3.jpg',
    //         img2: 'images/users/user8.jpg'
    //     },
    //     status: {
    //         // inProgress: 'In Progress',
    //         // pending: 'Pending',
    //         // open: 'Open',
    //         closed: 'Closed',
    //     },
    //     action: {
    //         view: 'visibility',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     ticketID: '#469',
    //     subject: 'Aegis Accounting Service',
    //     contact: {
    //         img: 'images/users/user14.jpg',
    //         name: 'Nathaniel Hulsey'
    //     },
    //     createdDate: '06 Nov, 2024',
    //     dueDate: '06 Dec, 2024',
    //     requester: 'Steve Smith',
    //     priority: 'Low',
    //     assignedAgents: {
    //         img1: 'images/users/user6.jpg',
    //         img2: 'images/users/user13.jpg'
    //     },
    //     status: {
    //         inProgress: 'In Progress',
    //         // pending: 'Pending',
    //         // open: 'Open',
    //         // closed: 'Closed',
    //     },
    //     action: {
    //         view: 'visibility',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     ticketID: '#469',
    //     subject: 'Aegis Accounting Service',
    //     contact: {
    //         img: 'images/users/user14.jpg',
    //         name: 'Nathaniel Hulsey'
    //     },
    //     createdDate: '06 Nov, 2024',
    //     dueDate: '06 Dec, 2024',
    //     requester: 'Steve Smith',
    //     priority: 'Low',
    //     assignedAgents: {
    //         img1: 'images/users/user6.jpg',
    //         img2: 'images/users/user13.jpg'
    //     },
    //     status: {
    //         inProgress: 'In Progress',
    //         // pending: 'Pending',
    //         // open: 'Open',
    //         // closed: 'Closed',
    //     },
    //     action: {
    //         view: 'visibility',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     ticketID: '#367',
    //     subject: 'Beja Banking Finance',
    //     contact: {
    //         img: 'images/users/user13.jpg',
    //         name: 'Thomas Wilson'
    //     },
    //     createdDate: '07 Nov, 2024',
    //     dueDate: '07 Dec, 2024',
    //     requester: 'David Williams',
    //     priority: 'High',
    //     assignedAgents: {
    //         img1: 'images/users/user3.jpg',
    //         img2: 'images/users/user8.jpg'
    //     },
    //     status: {
    //         // inProgress: 'In Progress',
    //         // pending: 'Pending',
    //         // open: 'Open',
    //         closed: 'Closed',
    //     },
    //     action: {
    //         view: 'visibility',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     ticketID: '#658',
    //     subject: 'Aoriv AI Design',
    //     contact: {
    //         img: 'images/users/user6.jpg',
    //         name: 'Marcelino Haddock'
    //     },
    //     createdDate: '08 Nov, 2024',
    //     dueDate: '08 Dec, 2024',
    //     requester: 'Jonathan Jones',
    //     priority: 'High',
    //     assignedAgents: {
    //         img1: 'images/users/user17.jpg',
    //         img2: 'images/users/user13.jpg'
    //     },
    //     status: {
    //         // inProgress: 'In Progress',
    //         // pending: 'Pending',
    //         open: 'Open',
    //         // closed: 'Closed',
    //     },
    //     action: {
    //         view: 'visibility',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     ticketID: '#547',
    //     subject: 'Vaxo App Design',
    //     contact: {
    //         img: 'images/users/user1.jpg',
    //         name: 'Robert Fairweather'
    //     },
    //     createdDate: '09 Nov, 2024',
    //     dueDate: '09 Dec, 2024',
    //     requester: 'Robert Heinemann',
    //     priority: 'High',
    //     assignedAgents: {
    //         img1: 'images/users/user7.jpg',
    //         img2: 'images/users/user12.jpg',
    //         img3: 'images/users/user16.jpg'
    //     },
    //     status: {
    //         // inProgress: 'In Progress',
    //         pending: 'Pending',
    //         // open: 'Open',
    //         // closed: 'Closed',
    //     },
    //     action: {
    //         view: 'visibility',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     ticketID: '#431',
    //     subject: 'Network Connectivity',
    //     contact: {
    //         img: 'images/users/user9.jpg',
    //         name: 'Ramiro McCarty'
    //     },
    //     createdDate: '10 Nov, 2024',
    //     dueDate: '10 Dec, 2024',
    //     requester: 'Carol Camacho',
    //     priority: 'Low',
    //     assignedAgents: {
    //         img1: 'images/users/user10.jpg',
    //         img2: 'images/users/user5.jpg'
    //     },
    //     status: {
    //         inProgress: 'In Progress',
    //         // pending: 'Pending',
    //         // open: 'Open',
    //         // closed: 'Closed',
    //     },
    //     action: {
    //         view: 'visibility',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     ticketID: '#469',
    //     subject: 'System Upgrade',
    //     contact: {
    //         img: 'images/users/user16.jpg',
    //         name: 'Rebecca Block'
    //     },
    //     createdDate: '11 Nov, 2024',
    //     dueDate: '11 Dec, 2024',
    //     requester: 'Dustin Fritch',
    //     priority: 'Medium',
    //     assignedAgents: {
    //         img1: 'images/users/user15.jpg',
    //         img2: 'images/users/user6.jpg'
    //     },
    //     status: {
    //         inProgress: 'In Progress',
    //         // pending: 'Pending',
    //         // open: 'Open',
    //         // closed: 'Closed',
    //     },
    //     action: {
    //         view: 'visibility',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     ticketID: '#367',
    //     subject: 'Software Installation',
    //     contact: {
    //         img: 'images/users/user5.jpg',
    //         name: 'Barbara Cross'
    //     },
    //     createdDate: '12 Nov, 2024',
    //     dueDate: '12 Dec, 2024',
    //     requester: 'Robert Stewart',
    //     priority: 'Low',
    //     assignedAgents: {
    //         img1: 'images/users/user11.jpg',
    //         img2: 'images/users/user3.jpg',
    //         img3: 'images/users/user8.jpg'
    //     },
    //     status: {
    //         // inProgress: 'In Progress',
    //         // pending: 'Pending',
    //         // open: 'Open',
    //         closed: 'Closed',
    //     },
    //     action: {
    //         view: 'visibility',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     ticketID: '#658',
    //     subject: 'Application Error',
    //     contact: {
    //         img: 'images/users/user12.jpg',
    //         name: 'Donna Miller'
    //     },
    //     createdDate: '13 Nov, 2024',
    //     dueDate: '13 Dec, 2024',
    //     requester: 'Roscoe Guerrero',
    //     priority: 'High',
    //     assignedAgents: {
    //         img1: 'images/users/user16.jpg',
    //         img2: 'images/users/user17.jpg'
    //     },
    //     status: {
    //         // inProgress: 'In Progress',
    //         // pending: 'Pending',
    //         open: 'Open',
    //         // closed: 'Closed',
    //     },
    //     action: {
    //         view: 'visibility',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     ticketID: '#547',
    //     subject: 'Email Configuration',
    //     contact: {
    //         img: 'images/users/user7.jpg',
    //         name: 'Carolyn Barnes'
    //     },
    //     createdDate: '14 Nov, 2024',
    //     dueDate: '14 Dec, 2024',
    //     requester: 'Kimberly Anderson',
    //     priority: 'Medium',
    //     assignedAgents: {
    //         img1: 'images/users/user7.jpg',
    //         img2: 'images/users/user9.jpg',
    //         img3: 'images/users/user12.jpg'
    //     },
    //     status: {
    //         // inProgress: 'In Progress',
    //         pending: 'Pending',
    //         // open: 'Open',
    //         // closed: 'Closed',
    //     },
    //     action: {
    //         view: 'visibility',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     ticketID: '#951',
    //     subject: 'Login Issues',
    //     contact: {
    //         img: 'images/users/user15.jpg',
    //         name: 'Marcia Baker'
    //     },
    //     createdDate: '15 Nov, 2024',
    //     dueDate: '15 Dec, 2024',
    //     requester: 'Walter Frazier',
    //     priority: 'High',
    //     assignedAgents: {
    //         img1: 'images/users/user5.jpg',
    //         img2: 'images/users/user13.jpg'
    //     },
    //     status: {
    //         inProgress: 'In Progress',
    //         // pending: 'Pending',
    //         // open: 'Open',
    //         // closed: 'Closed',
    //     },
    //     action: {
    //         view: 'visibility',
    //         delete: 'delete'
    //     }
    // }
];
export interface PeriodicElement {
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