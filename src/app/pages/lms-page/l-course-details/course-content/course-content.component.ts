import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-course-content',
    imports: [MatCardModule, MatButtonModule, MatExpansionModule],
    templateUrl: './course-content.component.html',
    styleUrl: './course-content.component.scss'
})
export class CourseContentComponent {

    // Expansion Panel
    panelOpenState = false;

    constructor(
        public themeService: CustomizerSettingsService
    ) {}
    
}