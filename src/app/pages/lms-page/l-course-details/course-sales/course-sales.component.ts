import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CourseSalesService } from './course-sales.service';

@Component({
    selector: 'app-course-sales',
    imports: [MatCardModule, MatMenuModule, MatButtonModule],
    templateUrl: './course-sales.component.html',
    styleUrl: './course-sales.component.scss'
})
export class CourseSalesComponent {

    constructor(
        private courseSalesService: CourseSalesService
    ) {}

    ngOnInit(): void {
        this.courseSalesService.loadChart();
    }

}