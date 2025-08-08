import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { PaidCoursesComponent } from './paid-courses/paid-courses.component';
import { FreeCoursesComponent } from './free-courses/free-courses.component';
import { TopRatedCoursesComponent } from './top-rated-courses/top-rated-courses.component';
import { BestSellerCoursesComponent } from './best-seller-courses/best-seller-courses.component';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-l-courses',
    imports: [RouterLink, MatCardModule, MatMenuModule, MatButtonModule, MatTabsModule, AllCoursesComponent, PaidCoursesComponent, FreeCoursesComponent, TopRatedCoursesComponent, BestSellerCoursesComponent],
    templateUrl: './l-courses.component.html',
    styleUrl: './l-courses.component.scss'
})
export class LCoursesComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}