import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AgentInfoComponent } from './agent-info/agent-info.component';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-hd-ticket-details',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, FormsModule, MatFormFieldModule, MatInputModule, AgentInfoComponent],
    templateUrl: './hd-ticket-details.component.html',
    styleUrl: './hd-ticket-details.component.scss'
})
export class HdTicketDetailsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}