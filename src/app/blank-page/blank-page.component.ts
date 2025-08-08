import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-blank-page',
    imports: [RouterLink],
    templateUrl: './blank-page.component.html',
    styleUrl: './blank-page.component.scss'
})
export class BlankPageComponent {}