import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-profile-information',
    imports: [MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './profile-information.component.html',
    styleUrl: './profile-information.component.scss'
})
export class ProfileInformationComponent {}