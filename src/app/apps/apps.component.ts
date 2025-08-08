import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-apps',
    standalone: true,
    imports: [RouterLink, RouterOutlet],
    templateUrl: './apps.component.html',
    styleUrl: './apps.component.scss'
})
export class AppsComponent {}