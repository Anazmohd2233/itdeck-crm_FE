import { Component, Input } from '@angular/core';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-lead-conversation',
    imports: [],
    templateUrl: './lead-conversation.component.html',
    styleUrl: './lead-conversation.component.scss'
})
export class LeadConversationComponent {

    @Input() data: any;


    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}
