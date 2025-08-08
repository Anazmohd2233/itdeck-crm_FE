import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-recent-customer-rating',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, MatTableModule, MatProgressBarModule],
    templateUrl: './recent-customer-rating.component.html',
    styleUrl: './recent-customer-rating.component.scss'
})
export class RecentCustomerRatingComponent {

    displayedColumns: string[] = ['id', 'customer', 'rating', 'message'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        id: '#158',
        customer: {
            img: 'images/users/user15.jpg',
            name: 'Walter Frazier'
        },
        rating: {
            star1: 'ri-star-fill',
            star2: 'ri-star-fill',
            star3: 'ri-star-fill',
            star4: 'ri-star-fill',
            star5: 'ri-star-fill',
            overallStar: '5'
        },
        message: 'Overall good experience.',
    },
    {
        id: '#132',
        customer: {
            img: 'images/users/user7.jpg',
            name: 'Kimberly Anderson'
        },
        rating: {
            star1: 'ri-star-fill',
            star2: 'ri-star-fill',
            star3: 'ri-star-fill',
            star4: 'ri-star-fill',
            star5: 'ri-star-half-fill',
            overallStar: '4.5'
        },
        message: 'Excellent experience!',
    },
    {
        id: '#142',
        customer: {
            img: 'images/users/user5.jpg',
            name: 'Roscoe Guerrero'
        },
        rating: {
            star1: 'ri-star-fill',
            star2: 'ri-star-fill',
            star3: 'ri-star-fill',
            star4: 'ri-star-fill',
            star5: 'ri-star-line',
            overallStar: '4'
        },
        message: 'Top-notch customer service.',
    },
    {
        id: '#125',
        customer: {
            img: 'images/users/user12.jpg',
            name: 'Robert Stewart'
        },
        rating: {
            star1: 'ri-star-fill',
            star2: 'ri-star-fill',
            star3: 'ri-star-fill',
            star4: 'ri-star-fill',
            star5: 'ri-star-half-fill',
            overallStar: '4.9'
        },
        message: 'Excellent experience overall.',
    },
    {
        id: '#176',
        customer: {
            img: 'images/users/user15.jpg',
            name: 'Walter Frazier'
        },
        rating: {
            star1: 'ri-star-fill',
            star2: 'ri-star-fill',
            star3: 'ri-star-fill',
            star4: 'ri-star-fill',
            star5: 'ri-star-fill',
            overallStar: '5'
        },
        message: 'Overall good experience.',
    },
    {
        id: '#199',
        customer: {
            img: 'images/users/user7.jpg',
            name: 'Kimberly Anderson'
        },
        rating: {
            star1: 'ri-star-fill',
            star2: 'ri-star-fill',
            star3: 'ri-star-fill',
            star4: 'ri-star-fill',
            star5: 'ri-star-half-fill',
            overallStar: '4.5'
        },
        message: 'Excellent experience!',
    },
    {
        id: '#162',
        customer: {
            img: 'images/users/user5.jpg',
            name: 'Roscoe Guerrero'
        },
        rating: {
            star1: 'ri-star-fill',
            star2: 'ri-star-fill',
            star3: 'ri-star-fill',
            star4: 'ri-star-fill',
            star5: 'ri-star-line',
            overallStar: '4'
        },
        message: 'Top-notch customer service.',
    },
    {
        id: '#187',
        customer: {
            img: 'images/users/user12.jpg',
            name: 'Robert Stewart'
        },
        rating: {
            star1: 'ri-star-fill',
            star2: 'ri-star-fill',
            star3: 'ri-star-fill',
            star4: 'ri-star-fill',
            star5: 'ri-star-half-fill',
            overallStar: '4.9'
        },
        message: 'Excellent experience overall.',
    }
];

export interface PeriodicElement {
    id: string;
    customer: any;
    message: string;
    rating: any;
}