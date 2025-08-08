import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import {
    CdkDragDrop,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop';
import { NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-c-lead-kanban',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, CdkDropList, CdkDrag, CdkDropListGroup, NgIf, MatSelectModule, MatInputModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatTooltipModule,ReactiveFormsModule, FormsModule, FileUploadModule],
  templateUrl: './c-lead-kanban.component.html',
  styleUrl: './c-lead-kanban.component.scss'
})
export class CLeadKanbanComponent {
    public multiple: boolean = false;

     // To Do
     toDo : any = [
        {
            id: ' #ARP-1217',
            customer: {
                img: 'images/users/user15.jpg',
                name: 'Marcia Baker'
            },
            email: 'marcia@example.com',
            phone: '+1 555-123-4567',
            img1: `images/users/user2.jpg`,
            img2: `images/users/user4.jpg`,
            img3: `images/users/user5.jpg`,  
            daysLeft: '10 Days Left',
            createDate: 'Nov 10, 2024',
            company: 'ABC Corporation',
            leadSource: 'Website',
            status: {
                new: 'New',
                // won: 'Won',
                // inProgress: 'In Progress',
                // lost: 'Lost',
            },
            action: {
                view: 'visibility',
                edit: 'edit',
                delete: 'delete'
            }
        },
        {
            id: '#FDA-1364',
            customer: {
                img: 'images/users/user7.jpg',
                name: 'Carolyn Barnes'
            },
            email: 'barnes@example.com',
            phone: '+1 555-987-6543',
            img1: `images/users/user6.jpg`,
            img2: `images/users/user7.jpg`,
            img3: `images/users/user8.jpg`,  
            daysLeft: '10 Days Left',
            createDate: 'Nov 11, 2024',
            company: 'XYZ Ltd',
            leadSource: 'Referral',
            status: {
                // new: 'New',
                won: 'Won',
                // inProgress: 'In Progress',
                // lost: 'Lost',
            },
            action: {
                view: 'visibility',
                edit: 'edit',
                delete: 'delete'
            }
        },
        {
            id: '#DES-1364',
            customer: {
                img: 'images/users/user12.jpg',
                name: 'Donna Miller'
            },
            email: 'donna@example.com',
            phone: '+1 555-456-7890',
            img1: `images/users/user9.jpg`,
            img3: `images/users/user10.jpg`, 
            daysLeft: '10 Days Left',
            createDate: 'Nov 12, 2024',
            company: 'Tech Solutions',
            leadSource: 'Cold Call',
            status: {
                // new: 'New',
                // won: 'Won',
                inProgress: 'In Progress',
                // lost: 'Lost',
            },
            action: {
                view: 'visibility',
                edit: 'edit',
                delete: 'delete'
            }
        },
        {
            id: '#DCV-7342',
            customer: {
                img: 'images/users/user5.jpg',
                name: 'Barbara Cross'
            },
            email: 'cross@example.com',
            phone: '+1 555-369-7878',
            img1: `images/users/user11.jpg`,         
            daysLeft: '10 Days Left',
            createDate: 'Nov 13, 2024',
            company: 'Global Solutions',
            leadSource: 'Email Campaign',
            status: {
                new: 'New',
                // won: 'Won',
                // inProgress: 'In Progress',
                // lost: 'Lost',
            },
            action: {
                view: 'visibility',
                edit: 'edit',
                delete: 'delete'
            }
        }
  ];

  // In Progress
  inProgress : any = [
    {
        id: '#ASW-4619',
        customer: {
            img: 'images/users/user16.jpg',
            name: 'Rebecca Block'
        },
        email: 'block@example.com',
        phone: '+1 555-658-4488',
        img1: `images/users/user17.jpg`,
        img2: `images/users/user16.jpg`, 
        daysLeft: '10 Days Left',
        createDate: 'Nov 14, 2024',
        company: 'Acma Industries',
        leadSource: 'Online Store',
        status: {
            // new: 'New',
            // won: 'Won',
            // inProgress: 'In Progress',
            lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#AFR-7346',
        customer: {
            img: 'images/users/user9.jpg',
            name: 'Ramiro McCarty'
        },
        email: 'ramiro@example.com',
        phone: '+1 555-558-9966',
        img1: `images/users/user15.jpg`,
        daysLeft: '10 Days Left',
        createDate: 'Nov 15, 2024',
        company: 'Synergy Ltd',
        leadSource: 'Website',
        status: {
            // new: 'New',
            // won: 'Won',
            inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#WSA-7612',
        customer: {
            img: 'images/users/user9.jpg',
            name: 'Robert Fairweather'
        },
        email: 'robert@example.com',
        phone: '+1 555-357-5888',
        img1: `images/users/user14.jpg`,
        img2: `images/users/user13.jpg`,
        img3: `images/users/user12.jpg`,  
        daysLeft: '10 Days Left',
        createDate: 'Nov 16, 2024',
        company: 'Summit Solutions',
        leadSource: 'Email Campaign',
        status: {
            new: 'New',
            // won: 'Won',
            // inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#AQD-7642',
        customer: {
            img: 'images/users/user6.jpg',
            name: 'Marcelino Haddock'
        },
        email: 'haddock@example.com',
        phone: '+1 555-456-8877',
        img1: `images/users/user15.jpg`,
        img2: `images/users/user17.jpg`,
        img3: `images/users/user9.jpg`,
        daysLeft: '10 Days Left',
        createDate: 'Nov 17, 2024',
        company: 'Strategies Ltd',
        leadSource: 'Cold Call',
        status: {
            new: 'New',
            // won: 'Won',
            // inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#TGS-4652',
        customer: {
            img: 'images/users/user13.jpg',
            name: 'Thomas Wilson'
        },
        email: 'wildon@example.com',
        phone: '+1 555-622-4488',
        img1: `images/users/user7.jpg`,
        img2: `images/users/user8.jpg`,
        daysLeft: '10 Days Left',
        createDate: 'Nov 18, 2024',
        company: 'Tech Enterprises',
        leadSource: 'Referral',
        status: {
            // new: 'New',
            won: 'Won',
            // inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#EGC-7895',
        customer: {
            img: 'images/users/user14.jpg',
            name: 'Nathaniel Hulsey'
        },
        email: 'hulsey@example.com',
        phone: '+1 555-225-4488',
        img1: `images/users/user5.jpg`,
        img2: `images/users/user6.jpg`,
 
        daysLeft: '10 Days Left',
        createDate: 'Nov 19, 2024',
        company: 'Synetic Solutions',
        leadSource: 'Website',
        status: {
            // new: 'New',
            // won: 'Won',
            // inProgress: 'In Progress',
            lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#DFR-7895',
        customer: {
            img: 'images/users/user14.jpg',
            name: 'Nathaniel Hulsey'
        },
        email: 'hulsey@example.com',
        phone: '+1 555-225-4488',
        img1: `images/users/user2.jpg`,
        img2: `images/users/user4.jpg`,        
        daysLeft: '10 Days Left',
        createDate: 'Nov 19, 2024',
        company: 'Synetic Solutions',
        leadSource: 'Website',
        status: {
            // new: 'New',
            // won: 'Won',
            // inProgress: 'In Progress',
            lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    }
  ];

  // To Review
  toReview : any = [
    {
        id: '#SQA-4652',
        customer: {
            img: 'images/users/user13.jpg',
            name: 'Thomas Wilson'
        },
        email: 'wildon@example.com',
        phone: '+1 555-622-4488',
        img1: `images/users/user2.jpg`,
        img2: `images/users/user4.jpg`,
        daysLeft: '10 Days Left',
        createDate: 'Nov 18, 2024',
        company: 'Tech Enterprises',
        leadSource: 'Referral',
        status: {
            // new: 'New',
            won: 'Won',
            // inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#FBG-7642',
        customer: {
            img: 'images/users/user6.jpg',
            name: 'Marcelino Haddock'
        },
        email: 'haddock@example.com',
        phone: '+1 555-456-8877',
        img1: `images/users/user5.jpg`,
        img2: `images/users/user6.jpg`,
        daysLeft: '10 Days Left',
        createDate: 'Nov 17, 2024',
        company: 'Strategies Ltd',
        leadSource: 'Cold Call',
        status: {
            new: 'New',
            // won: 'Won',
            // inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#RTF-7612',
        customer: {
            img: 'images/users/user1.jpg',
            name: 'Robert Fairweather'
        },
        email: 'robert@example.com',
        phone: '+1 555-357-5888',
        img1: `images/users/user7.jpg`,
        img2: `images/users/user8.jpg`,
        daysLeft: '10 Days Left',
        createDate: 'Nov 16, 2024',
        company: 'Summit Solutions',
        leadSource: 'Email Campaign',
        status: {
            new: 'New',
            // won: 'Won',
            // inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#JHY-7346',
        customer: {
            img: 'images/users/user9.jpg',
            name: 'Ramiro McCarty'
        },
        email: 'ramiro@example.com',
        phone: '+1 555-558-9966',
        img1: `images/users/user9.jpg`,
        img2: `images/users/user10.jpg`,
        daysLeft: '10 Days Left',
        createDate: 'Nov 15, 2024',
        company: 'Synergy Ltd',
        leadSource: 'Website',
        status: {
            // new: 'New',
            // won: 'Won',
            inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#IKG-4619',
        customer: {
            img: 'images/users/user16.jpg',
            name: 'Rebecca Block'
        },
        email: 'block@example.com',
        phone: '+1 555-658-4488',
        img1: `images/users/user11.jpg`,
        img2: `images/users/user12.jpg`,
        img3: `images/users/user13.jpg`,
        daysLeft: '10 Days Left',
        createDate: 'Nov 14, 2024',
        company: 'Acma Industries',
        leadSource: 'Online Store',
        status: {
            // new: 'New',
            // won: 'Won',
            // inProgress: 'In Progress',
            lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#THB-7342',
        customer: {
            img: 'images/users/user5.jpg',
            name: 'Barbara Cross'
        },
        email: 'cross@example.com',
        phone: '+1 555-369-7878',
        img1: `images/users/user14.jpg`,
        img2: `images/users/user15.jpg`,
        daysLeft: '10 Days Left',
        createDate: 'Nov 13, 2024',
        company: 'Global Solutions',
        leadSource: 'Email Campaign',
        status: {
            new: 'New',
            // won: 'Won',
            // inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    }
  ];

  // To Completed
  toCompleted : any = [
    {
        id: '#IKG-4619',
        customer: {
            img: 'images/users/user16.jpg',
            name: 'Rebecca Block'
        },
        email: 'block@example.com',
        phone: '+1 555-658-4488',
        img1: `images/users/user17.jpg`,
        img2: `images/users/user16.jpg`,
        img3: `images/users/user15.jpg`,
        daysLeft: '10 Days Left',
        createDate: 'Nov 14, 2024',
        company: 'Acma Industries',
        leadSource: 'Online Store',
        status: {
            // new: 'New',
            // won: 'Won',
            // inProgress: 'In Progress',
            lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#THB-7342',
        customer: {
            img: 'images/users/user5.jpg',
            name: 'Barbara Cross'
        },
        email: 'cross@example.com',
        phone: '+1 555-369-7878',
        img1: `images/users/user14.jpg`,
        img2: `images/users/user13.jpg`,
        img3: `images/users/user12.jpg`,
        daysLeft: '10 Days Left',
        createDate: 'Nov 13, 2024',
        company: 'Global Solutions',
        leadSource: 'Email Campaign',
        status: {
            new: 'New',
            // won: 'Won',
            // inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },

    {
        id: '#NMK-1364',
        customer: {
            img: 'images/users/user12.jpg',
            name: 'Donna Miller'
        },
        email: 'donna@example.com',
        phone: '+1 555-456-7890',
        img1: `images/users/user11.jpg`,
        img2: `images/users/user10.jpg`,
        daysLeft: '10 Days Left',
        createDate: 'Nov 12, 2024',
        company: 'Tech Solutions',
        leadSource: 'Cold Call',
        status: {
            // new: 'New',
            // won: 'Won',
            inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#PLO-1364',
        customer: {
            img: 'images/users/user7.jpg',
            name: 'Carolyn Barnes'
        },
        email: 'barnes@example.com',
        phone: '+1 555-987-6543',
        img1: `images/users/user9.jpg`,
        img2: `images/users/user8.jpg`,
        daysLeft: '10 Days Left',
        createDate: 'Nov 11, 2024',
        company: 'XYZ Ltd',
        leadSource: 'Referral',
        status: {
            // new: 'New',
            won: 'Won',
            // inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: ' #UIK-1217',
        customer: {
            img: 'images/users/user15.jpg',
            name: 'Marcia Baker'
        },
        email: 'marcia@example.com',
        phone: '+1 555-123-4567',
        img1: `images/users/user7.jpg`,
        daysLeft: '10 Days Left',
        createDate: 'Nov 10, 2024',
        company: 'ABC Corporation',
        leadSource: 'Website',
        status: {
            new: 'New',
            // won: 'Won',
            // inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    }
  ];

  // Drag and Drop
  drop(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
          transferArrayItem(
              event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex,
          );
      }
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
