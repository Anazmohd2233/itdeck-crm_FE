import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TotalProjectsComponent } from './total-projects/total-projects.component';
import { ActiveProjectsComponent } from './active-projects/active-projects.component';
import { CompletedProjectsComponent } from './completed-projects/completed-projects.component';
import { TotalMembersComponent } from './total-members/total-members.component';

@Component({
    selector: 'app-projects-overview',
    imports: [MatCardModule, TotalProjectsComponent, ActiveProjectsComponent, CompletedProjectsComponent, TotalMembersComponent],
    templateUrl: './projects-overview.component.html',
    styleUrl: './projects-overview.component.scss'
})
export class ProjectsOverviewComponent {}