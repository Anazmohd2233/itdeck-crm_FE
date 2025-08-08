import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-additional-information',
    imports: [MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './additional-information.component.html',
    styleUrl: './additional-information.component.scss'
})
export class AdditionalInformationComponent {}