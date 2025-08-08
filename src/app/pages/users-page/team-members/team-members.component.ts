import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-team-members',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, NgFor],
    templateUrl: './team-members.component.html',
    styleUrl: './team-members.component.scss'
})
export class TeamMembersComponent {

    teamMemberCard = [
        {
            memberImg: `images/users/user1.jpg`,
            memberName: `Sutherland Lee`,
            designation: `Business Analyst`,
            joinedDate: `01 Jan, 2024`,
            contactPhone: `+1 555-445-4455`,
            location: `Washington D.C`,
            socialsLink: [
                {
                    icon: `ri-facebook-fill`,
                    class: `facebook`,
                    link: `https://www.facebook.com/`
                },
                {
                    icon: `ri-twitter-x-line`,
                    class: `twitter`,
                    link: `https://twitter.com/`
                },
                {
                    icon: `ri-linkedin-fill`,
                    class: `linkedin`,
                    link: `https://www.linkedin.com/`
                },
                {
                    icon: `ri-github-line`,
                    class: `github`,
                    link: `https://github.com/`
                }
            ]
        },
        {
            memberImg: `images/users/user2.jpg`,
            memberName: `Phyllis Torres`,
            designation: `Project Manager`,
            joinedDate: `10 Jan, 2024`,
            contactPhone: `+1 555-445-7788`,
            location: `San Diego`,
            socialsLink: [
                {
                    icon: `ri-facebook-fill`,
                    class: `facebook`,
                    link: `https://www.facebook.com/`
                },
                {
                    icon: `ri-twitter-x-line`,
                    class: `twitter`,
                    link: `https://twitter.com/`
                },
                {
                    icon: `ri-linkedin-fill`,
                    class: `linkedin`,
                    link: `https://www.linkedin.com/`
                },
                {
                    icon: `ri-github-line`,
                    class: `github`,
                    link: `https://github.com/`
                }
            ]
        },
        {
            memberImg: `images/users/user4.jpg`,
            memberName: `Richard Lyon`,
            designation: `Team Leader`,
            joinedDate: `20 Jan, 2024`,
            contactPhone: `+1 555-333-2288`,
            location: `Los Angeles`,
            socialsLink: [
                {
                    icon: `ri-facebook-fill`,
                    class: `facebook`,
                    link: `https://www.facebook.com/`
                },
                {
                    icon: `ri-twitter-x-line`,
                    class: `twitter`,
                    link: `https://twitter.com/`
                },
                {
                    icon: `ri-linkedin-fill`,
                    class: `linkedin`,
                    link: `https://www.linkedin.com/`
                },
                {
                    icon: `ri-github-line`,
                    class: `github`,
                    link: `https://github.com/`
                }
            ]
        },
        {
            memberImg: `images/users/user5.jpg`,
            memberName: `Charlotte Sturges`,
            designation: `Designer`,
            joinedDate: `01 Feb, 2024`,
            contactPhone: `+1 555-444-3355`,
            location: `Boston`,
            socialsLink: [
                {
                    icon: `ri-facebook-fill`,
                    class: `facebook`,
                    link: `https://www.facebook.com/`
                },
                {
                    icon: `ri-twitter-x-line`,
                    class: `twitter`,
                    link: `https://twitter.com/`
                },
                {
                    icon: `ri-linkedin-fill`,
                    class: `linkedin`,
                    link: `https://www.linkedin.com/`
                },
                {
                    icon: `ri-github-line`,
                    class: `github`,
                    link: `https://github.com/`
                }
            ]
        },
        {
            memberImg: `images/users/user6.jpg`,
            memberName: `Anita McNeel`,
            designation: `Technical Writer`,
            joinedDate: `10 Feb, 2024`,
            contactPhone: `+1 555-455-9966`,
            location: `Chicago`,
            socialsLink: [
                {
                    icon: `ri-facebook-fill`,
                    class: `facebook`,
                    link: `https://www.facebook.com/`
                },
                {
                    icon: `ri-twitter-x-line`,
                    class: `twitter`,
                    link: `https://twitter.com/`
                },
                {
                    icon: `ri-linkedin-fill`,
                    class: `linkedin`,
                    link: `https://www.linkedin.com/`
                },
                {
                    icon: `ri-github-line`,
                    class: `github`,
                    link: `https://github.com/`
                }
            ]
        },
        {
            memberImg: `images/users/user7.jpg`,
            memberName: `Richard Meade`,
            designation: `Data Analyst`,
            joinedDate: `01 Mar, 2024`,
            contactPhone: `+1 555-225-7755`,
            location: `Las Vegas`,
            socialsLink: [
                {
                    icon: `ri-facebook-fill`,
                    class: `facebook`,
                    link: `https://www.facebook.com/`
                },
                {
                    icon: `ri-twitter-x-line`,
                    class: `twitter`,
                    link: `https://twitter.com/`
                },
                {
                    icon: `ri-linkedin-fill`,
                    class: `linkedin`,
                    link: `https://www.linkedin.com/`
                },
                {
                    icon: `ri-github-line`,
                    class: `github`,
                    link: `https://github.com/`
                }
            ]
        },
        {
            memberImg: `images/users/user8.jpg`,
            memberName: `Roger Rodriguez`,
            designation: `Sales Representative`,
            joinedDate: `15 Mar, 2024`,
            contactPhone: `+1 555-444-8822`,
            location: `San Francisco`,
            socialsLink: [
                {
                    icon: `ri-facebook-fill`,
                    class: `facebook`,
                    link: `https://www.facebook.com/`
                },
                {
                    icon: `ri-twitter-x-line`,
                    class: `twitter`,
                    link: `https://twitter.com/`
                },
                {
                    icon: `ri-linkedin-fill`,
                    class: `linkedin`,
                    link: `https://www.linkedin.com/`
                },
                {
                    icon: `ri-github-line`,
                    class: `github`,
                    link: `https://github.com/`
                }
            ]
        },
        {
            memberImg: `images/users/user9.jpg`,
            memberName: `Jack Weber`,
            designation: `Manager`,
            joinedDate: `01 Apr, 2024`,
            contactPhone: `+1 555-455-4411`,
            location: `Houston`,
            socialsLink: [
                {
                    icon: `ri-facebook-fill`,
                    class: `facebook`,
                    link: `https://www.facebook.com/`
                },
                {
                    icon: `ri-twitter-x-line`,
                    class: `twitter`,
                    link: `https://twitter.com/`
                },
                {
                    icon: `ri-linkedin-fill`,
                    class: `linkedin`,
                    link: `https://www.linkedin.com/`
                },
                {
                    icon: `ri-github-line`,
                    class: `github`,
                    link: `https://github.com/`
                }
            ]
        },
        {
            memberImg: `images/users/user10.jpg`,
            memberName: `Michael Mackenzie`,
            designation: `Web Developer`,
            joinedDate: `10 Apr, 2024`,
            contactPhone: `+1 555-555-9922`,
            location: `Oklahoma City`,
            socialsLink: [
                {
                    icon: `ri-facebook-fill`,
                    class: `facebook`,
                    link: `https://www.facebook.com/`
                },
                {
                    icon: `ri-twitter-x-line`,
                    class: `twitter`,
                    link: `https://twitter.com/`
                },
                {
                    icon: `ri-linkedin-fill`,
                    class: `linkedin`,
                    link: `https://www.linkedin.com/`
                },
                {
                    icon: `ri-github-line`,
                    class: `github`,
                    link: `https://github.com/`
                }
            ]
        },
        {
            memberImg: `images/users/user11.jpg`,
            memberName: `Charles Tharp`,
            designation: `Accountant`,
            joinedDate: `01 May, 2024`,
            contactPhone: `+1 555-433-2255`,
            location: `Austin`,
            socialsLink: [
                {
                    icon: `ri-facebook-fill`,
                    class: `facebook`,
                    link: `https://www.facebook.com/`
                },
                {
                    icon: `ri-twitter-x-line`,
                    class: `twitter`,
                    link: `https://twitter.com/`
                },
                {
                    icon: `ri-linkedin-fill`,
                    class: `linkedin`,
                    link: `https://www.linkedin.com/`
                },
                {
                    icon: `ri-github-line`,
                    class: `github`,
                    link: `https://github.com/`
                }
            ]
        },
        {
            memberImg: `images/users/user12.jpg`,
            memberName: `Tina Bell`,
            designation: `Executive Assistant`,
            joinedDate: `10 May, 2024`,
            contactPhone: `+1 555-444-3399`,
            location: `Portland`,
            socialsLink: [
                {
                    icon: `ri-facebook-fill`,
                    class: `facebook`,
                    link: `https://www.facebook.com/`
                },
                {
                    icon: `ri-twitter-x-line`,
                    class: `twitter`,
                    link: `https://twitter.com/`
                },
                {
                    icon: `ri-linkedin-fill`,
                    class: `linkedin`,
                    link: `https://www.linkedin.com/`
                },
                {
                    icon: `ri-github-line`,
                    class: `github`,
                    link: `https://github.com/`
                }
            ]
        },
        {
            memberImg: `images/users/user13.jpg`,
            memberName: `Melvin Larocque`,
            designation: `Business Analyst`,
            joinedDate: `01 Jun, 2024`,
            contactPhone: `+1 555-445-5855`,
            location: `San Diego`,
            socialsLink: [
                {
                    icon: `ri-facebook-fill`,
                    class: `facebook`,
                    link: `https://www.facebook.com/`
                },
                {
                    icon: `ri-twitter-x-line`,
                    class: `twitter`,
                    link: `https://twitter.com/`
                },
                {
                    icon: `ri-linkedin-fill`,
                    class: `linkedin`,
                    link: `https://www.linkedin.com/`
                },
                {
                    icon: `ri-github-line`,
                    class: `github`,
                    link: `https://github.com/`
                }
            ]
        }
    ]

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}