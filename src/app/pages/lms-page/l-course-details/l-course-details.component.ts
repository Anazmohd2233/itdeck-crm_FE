import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { CourseInstructorComponent } from './course-instructor/course-instructor.component';
import { EnrolledStudentsComponent } from './enrolled-students/enrolled-students.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { CourseSalesComponent } from './course-sales/course-sales.component';
import { CourseVideosComponent } from './course-videos/course-videos.component';
import { CourseRatingsComponent } from './course-ratings/course-ratings.component';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-l-course-details',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatTooltipModule, CourseInstructorComponent, EnrolledStudentsComponent, CourseContentComponent, CourseSalesComponent, CourseVideosComponent, CourseRatingsComponent],
    templateUrl: './l-course-details.component.html',
    styleUrl: './l-course-details.component.scss'
})
export class LCourseDetailsComponent {

    displayedColumns: string[] = ['id', 'courseName', 'category', 'instructor', 'enrolledStudents', 'startDate', 'endDate', 'price', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        id: '#258',
        courseName: 'Introduction to python',
        category: 'Technology',
        instructor: 'Ann Cohen',
        enrolledStudents: '120',
        startDate: '01 Aug, 2024',
        endDate: '30 Dec, 2024',
        price: '$30.99',
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    }
];

export interface PeriodicElement {
    id: string;
    courseName: string;
    category: string;
    instructor: string;
    enrolledStudents: string;
    startDate: string;
    endDate: string;
    price: string;
    action: any;
}