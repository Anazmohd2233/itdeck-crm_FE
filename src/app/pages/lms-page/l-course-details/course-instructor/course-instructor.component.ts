import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-course-instructor',
    imports: [MatCardModule, MatButtonModule],
    templateUrl: './course-instructor.component.html',
    styleUrl: './course-instructor.component.scss'
})
export class CourseInstructorComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}