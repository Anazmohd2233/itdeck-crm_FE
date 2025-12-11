import { Component, Input, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { NewUsersComponent } from './new-users/new-users.component';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { LeadConversationComponent } from './lead-conversation/lead-conversation.component';
import { RevenueGrowthComponent } from './revenue-growth/revenue-growth.component';
import { TotalDataCollectedComponent } from './total-data-collected/total-data.component';

@Component({
    selector: 'app-stats',
    imports: [
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        NewUsersComponent,
        ActiveUsersComponent,
        LeadConversationComponent,
        RevenueGrowthComponent,
        TotalDataCollectedComponent
    ],
    templateUrl: './stats.component.html',
    styleUrl: './stats.component.scss',
})
export class StatsComponent {
    @Input() data: any;

    total: any;
    ongoing: any;
    completed: any;
    open: any;

    constructor() {}

     ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      console.log('data received:', this.data);

      this.total = this.data?.tasks?.total;
      this.open = this.data?.tasks?.open;
      this.ongoing = this.data?.tasks?.ongoing;
      this.completed = this.data?.tasks?.completed;
    }
  }
   
}
