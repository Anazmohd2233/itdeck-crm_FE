import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { TasksStatsService } from './tasks-stats.service';

@Component({
    selector: 'app-tasks-stats',
    imports: [MatCardModule, MatMenuModule, MatButtonModule],
    templateUrl: './tasks-stats.component.html',
    styleUrl: './tasks-stats.component.scss'
})
export class TasksStatsComponent {

    constructor(
        private tasksStatsService: TasksStatsService
    ) {}

    ngOnInit(): void {
        this.tasksStatsService.loadChart();
    }

}