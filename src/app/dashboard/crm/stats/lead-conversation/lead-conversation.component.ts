import { Component } from '@angular/core';
import { LeadConversationService } from './lead-conversation.service';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-lead-conversation',
    imports: [],
    templateUrl: './lead-conversation.component.html',
    styleUrl: './lead-conversation.component.scss'
})
export class LeadConversationComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private leadConversationService: LeadConversationService
    ) {}

    ngOnInit(): void {
        this.leadConversationService.loadChart();
    }

}