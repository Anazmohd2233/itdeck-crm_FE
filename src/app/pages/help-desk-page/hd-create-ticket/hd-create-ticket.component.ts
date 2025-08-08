import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@Component({
  selector: 'app-hd-create-ticket',
  imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, FileUploadModule, NgxMaterialTimepickerModule, NgxEditorModule, NgIf],
  templateUrl: './hd-create-ticket.component.html',
  styleUrl: './hd-create-ticket.component.scss'
})
export class HdCreateTicketComponent {

  // Text Editor
  editor!: Editor | null;  // Make it nullable
  toolbar: Toolbar = [
      ['bold', 'italic'],
      ['underline', 'strike'],
      ['code', 'blockquote'],
      ['ordered_list', 'bullet_list'],
      [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
      ['link', 'image'],
      ['text_color', 'background_color'],
      ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  data: any = ELEMENT_DATA

  ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
          // Initialize the editor only in the browser
          this.editor = new Editor();
      }
  }

  ngOnDestroy(): void {
      if (isPlatformBrowser(this.platformId) && this.editor) {
          this.editor.destroy();
      }
  }

  // File Uploader
  public multiple: boolean = false;

  constructor(
      @Inject(PLATFORM_ID) private platformId: Object,
      public themeService: CustomizerSettingsService
  ) {}

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
    {
        ticketID: '#469',
        subject: 'System Upgrade',
        contact: {
            img: 'images/users/user16.jpg',
            name: 'Rebecca Block'
        },
        createdDate: '11 Nov, 2024',
        dueDate: '11 Dec, 2024',
        requester: 'Dustin Fritch',
        priority: 'Medium',
        assignedAgents: {
            img1: 'images/users/user15.jpg',
            img2: 'images/users/user6.jpg'
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
        ticketID: '#431',
        subject: 'Network Connectivity',
        contact: {
            img: 'images/users/user9.jpg',
            name: 'Ramiro McCarty'
        },
        createdDate: '10 Nov, 2024',
        dueDate: '10 Dec, 2024',
        requester: 'Carol Camacho',
        priority: 'Low',
        assignedAgents: {
            img1: 'images/users/user10.jpg',
            img2: 'images/users/user5.jpg'
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
        subject: 'Vaxo App Design',
        contact: {
            img: 'images/users/user1.jpg',
            name: 'Robert Fairweather'
        },
        createdDate: '09 Nov, 2024',
        dueDate: '09 Dec, 2024',
        requester: 'Robert Heinemann',
        priority: 'High',
        assignedAgents: {
            img1: 'images/users/user7.jpg',
            img2: 'images/users/user12.jpg',
            img3: 'images/users/user16.jpg'
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
        subject: 'Aoriv AI Design',
        contact: {
            img: 'images/users/user6.jpg',
            name: 'Marcelino Haddock'
        },
        createdDate: '08 Nov, 2024',
        dueDate: '08 Dec, 2024',
        requester: 'Jonathan Jones',
        priority: 'High',
        assignedAgents: {
            img1: 'images/users/user17.jpg',
            img2: 'images/users/user13.jpg'
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
        subject: 'Beja Banking Finance',
        contact: {
            img: 'images/users/user13.jpg',
            name: 'Thomas Wilson'
        },
        createdDate: '07 Nov, 2024',
        dueDate: '07 Dec, 2024',
        requester: 'David Williams',
        priority: 'High',
        assignedAgents: {
            img1: 'images/users/user3.jpg',
            img2: 'images/users/user8.jpg'
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
    {
        ticketID: '#469',
        subject: 'Aegis Accounting Service',
        contact: {
            img: 'images/users/user14.jpg',
            name: 'Nathaniel Hulsey'
        },
        createdDate: '06 Nov, 2024',
        dueDate: '06 Dec, 2024',
        requester: 'Steve Smith',
        priority: 'Low',
        assignedAgents: {
            img1: 'images/users/user6.jpg',
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
        ticketID: '#469',
        subject: 'Aegis Accounting Service',
        contact: {
            img: 'images/users/user14.jpg',
            name: 'Nathaniel Hulsey'
        },
        createdDate: '06 Nov, 2024',
        dueDate: '06 Dec, 2024',
        requester: 'Steve Smith',
        priority: 'Low',
        assignedAgents: {
            img1: 'images/users/user6.jpg',
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
        ticketID: '#367',
        subject: 'Beja Banking Finance',
        contact: {
            img: 'images/users/user13.jpg',
            name: 'Thomas Wilson'
        },
        createdDate: '07 Nov, 2024',
        dueDate: '07 Dec, 2024',
        requester: 'David Williams',
        priority: 'High',
        assignedAgents: {
            img1: 'images/users/user3.jpg',
            img2: 'images/users/user8.jpg'
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
    {
        ticketID: '#658',
        subject: 'Aoriv AI Design',
        contact: {
            img: 'images/users/user6.jpg',
            name: 'Marcelino Haddock'
        },
        createdDate: '08 Nov, 2024',
        dueDate: '08 Dec, 2024',
        requester: 'Jonathan Jones',
        priority: 'High',
        assignedAgents: {
            img1: 'images/users/user17.jpg',
            img2: 'images/users/user13.jpg'
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
        ticketID: '#547',
        subject: 'Vaxo App Design',
        contact: {
            img: 'images/users/user1.jpg',
            name: 'Robert Fairweather'
        },
        createdDate: '09 Nov, 2024',
        dueDate: '09 Dec, 2024',
        requester: 'Robert Heinemann',
        priority: 'High',
        assignedAgents: {
            img1: 'images/users/user7.jpg',
            img2: 'images/users/user12.jpg',
            img3: 'images/users/user16.jpg'
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
        ticketID: '#431',
        subject: 'Network Connectivity',
        contact: {
            img: 'images/users/user9.jpg',
            name: 'Ramiro McCarty'
        },
        createdDate: '10 Nov, 2024',
        dueDate: '10 Dec, 2024',
        requester: 'Carol Camacho',
        priority: 'Low',
        assignedAgents: {
            img1: 'images/users/user10.jpg',
            img2: 'images/users/user5.jpg'
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
        ticketID: '#469',
        subject: 'System Upgrade',
        contact: {
            img: 'images/users/user16.jpg',
            name: 'Rebecca Block'
        },
        createdDate: '11 Nov, 2024',
        dueDate: '11 Dec, 2024',
        requester: 'Dustin Fritch',
        priority: 'Medium',
        assignedAgents: {
            img1: 'images/users/user15.jpg',
            img2: 'images/users/user6.jpg'
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
    }
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