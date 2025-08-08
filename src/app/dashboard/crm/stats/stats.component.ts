import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { NewUsersComponent } from './new-users/new-users.component';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { LeadConversationComponent } from './lead-conversation/lead-conversation.component';
import { RevenueGrowthComponent } from './revenue-growth/revenue-growth.component';

@Component({
    selector: 'app-stats',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, NewUsersComponent, ActiveUsersComponent, LeadConversationComponent, RevenueGrowthComponent],
    templateUrl: './stats.component.html',
    styleUrl: './stats.component.scss'
})
export class StatsComponent {}