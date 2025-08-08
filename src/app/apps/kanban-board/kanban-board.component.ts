import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
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
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-kanban-board',
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, CdkDropList, CdkDrag, CdkDropListGroup, NgIf, MatSelectModule, MatInputModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule],
    templateUrl: './kanban-board.component.html',
    styleUrl: './kanban-board.component.scss'
})
export class KanbanBoardComponent {

    // To Do
    toDo : any = [
        {
            title: `Project monitoring`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `3 days left`,
            category: `Design`,
            createdDate: `Created 20 Nov`,
            img1: `images/users/user2.jpg`,
            img2: `images/users/user4.jpg`,
            img3: `images/users/user5.jpg`
        },
        {
            title: `Social media campaign`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `2 days left`,
            category: `Marketing`,
            createdDate: `Created 19 Nov`,
            img1: `images/users/user6.jpg`,
            img2: `images/users/user7.jpg`,
            img3: `images/users/user8.jpg`
        },
        {
            title: `Project`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `4 days left`,
            category: `Daxa`,
            createdDate: `Created 18 Nov`,
            img1: `images/users/user9.jpg`,
            img3: `images/users/user10.jpg`
        },
        {
            title: `Project`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `2 days left`,
            category: `Development`,
            createdDate: `Created 17 Nov`,
            img1: `images/users/user11.jpg`
        }
    ];

    // In Progress
    inProgress : any = [
        {
            title: `eCommerce development`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `3 days left`,
            category: `Marketing`,
            createdDate: `Created 20 Nov`,
            img1: `images/users/user17.jpg`,
            img2: `images/users/user16.jpg`
        },
        {
            title: `WordPress development`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `2 days left`,
            category: `Design`,
            createdDate: `Created 19 Nov`,
            img1: `images/users/user15.jpg`
        },
        {
            title: `Web development`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `4 days left`,
            category: `Development`,
            createdDate: `Created 18 Nov`,
            img1: `images/users/user14.jpg`,
            img2: `images/users/user13.jpg`,
            img3: `images/users/user12.jpg`
        },
        {
            title: `Digital marketing`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `5 days left`,
            category: `Daxa`,
            createdDate: `Created 17 Nov`,
            img1: `images/users/user15.jpg`,
            img2: `images/users/user17.jpg`,
            img3: `images/users/user9.jpg`
        },
        {
            title: `Frontend design update`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `2 days left`,
            category: `Design`,
            createdDate: `Created 16 Nov`,
            img1: `images/users/user7.jpg`,
            img2: `images/users/user8.jpg`
        },
        {
            title: `Daxa dashboard design`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `3 days left`,
            category: `Dashboard`,
            createdDate: `Created 15 Nov`,
            img1: `images/users/user5.jpg`,
            img2: `images/users/user6.jpg`
        },
        {
            title: `Mobile app development`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `1 day left`,
            category: `Mobile`,
            createdDate: `Created 14 Nov`,
            img1: `images/users/user2.jpg`,
            img2: `images/users/user4.jpg`
        }
    ];

    // To Review
    toReview : any = [
        {
            title: `Project monitoring`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `10 days left`,
            category: `IT`,
            createdDate: `Created 10 Nov`,
            img1: `images/users/user2.jpg`,
            img2: `images/users/user4.jpg`
        },
        {
            title: `Social media campaign`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `5 days left`,
            category: `Social`,
            createdDate: `Created 11 Nov`,
            img1: `images/users/user5.jpg`,
            img2: `images/users/user6.jpg`
        },
        {
            title: `Mobile app development`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `6 days left`,
            category: `App`,
            createdDate: `Created 12 Nov`,
            img1: `images/users/user7.jpg`,
            img2: `images/users/user8.jpg`
        },
        {
            title: `Website development`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `8 days left`,
            category: `Website`,
            createdDate: `Created 13 Nov`,
            img1: `images/users/user9.jpg`,
            img2: `images/users/user10.jpg`
        },
        {
            title: `Digital marketing`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `4 days left`,
            category: `Digital`,
            createdDate: `Created 14 Nov`,
            img1: `images/users/user11.jpg`,
            img2: `images/users/user12.jpg`,
            img3: `images/users/user13.jpg`
        },
        {
            title: `WordPress development`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `6 days left`,
            category: `WordPress`,
            createdDate: `Created 15 Nov`,
            img1: `images/users/user14.jpg`,
            img2: `images/users/user15.jpg`
        }
    ];

    // To Completed
    toCompleted : any = [
        {
            title: `App project update`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `Done`,
            category: `App`,
            createdDate: `Created 25 Nov`,
            img1: `images/users/user17.jpg`,
            img2: `images/users/user16.jpg`,
            img3: `images/users/user15.jpg`
        },
        {
            title: `E-commerce site`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `Done`,
            category: `Site`,
            createdDate: `Created 24 Nov`,
            img1: `images/users/user14.jpg`,
            img2: `images/users/user13.jpg`,
            img3: `images/users/user12.jpg`
        },
        {
            title: `LMS & education site design`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `Done`,
            category: `Education`,
            createdDate: `Created 23 Nov`,
            img1: `images/users/user11.jpg`,
            img2: `images/users/user10.jpg`
        },
        {
            title: `Creative portfolio design`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `Done`,
            category: `Portfolio`,
            createdDate: `Created 22 Nov`,
            img1: `images/users/user9.jpg`,
            img2: `images/users/user8.jpg`
        },
        {
            title: `Vaxo admin dashboard`,
            description: `This column represents tasks that have been identified but are not yet scheduled for work.`,
            daysLeft: `Done`,
            category: `Admin`,
            createdDate: `Created 21 Nov`,
            img1: `images/users/user7.jpg`
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