import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-agent-info',
    imports: [MatMenuModule, MatButtonModule, MatCardModule],
    templateUrl: './agent-info.component.html',
    styleUrl: './agent-info.component.scss'
})
export class AgentInfoComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}