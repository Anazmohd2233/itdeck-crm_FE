import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ProjectsProgressService } from './projects-progress.service';

@Component({
    selector: 'app-projects-progress:not(p)',
    imports: [MatCardModule, MatMenuModule, MatButtonModule],
    templateUrl: './projects-progress.component.html',
    styleUrl: './projects-progress.component.scss'
})
export class ProjectsProgressComponent {

    constructor(
        private projectsProgressService: ProjectsProgressService
    ) {}

    ngOnInit(): void {
        this.projectsProgressService.loadChart();
    }

}