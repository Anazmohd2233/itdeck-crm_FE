import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-top-rated-courses',
    imports: [RouterLink, MatCardModule, MatMenuModule, MatButtonModule, MatTableModule, MatPaginatorModule, NgIf, MatTooltipModule],
    templateUrl: './top-rated-courses.component.html',
    styleUrl: './top-rated-courses.component.scss'
})
export class TopRatedCoursesComponent {

    displayedColumns: string[] = ['id', 'courseName', 'category', 'instructor', 'enrolledStudents', 'startDate', 'endDate', 'price', 'status', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        id: '#439',
        courseName: 'Business finance',
        category: 'Business',
        instructor: 'Mark Rivera',
        enrolledStudents: '50',
        startDate: '01 Oct, 2024',
        endDate: '30 Dec, 2024',
        price: '$20.99',
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#258',
        courseName: 'Introduction to python',
        category: 'Technology',
        instructor: 'Ann Cohen',
        enrolledStudents: '120',
        startDate: '01 Aug, 2024',
        endDate: '30 Dec, 2024',
        price: '$30.99',
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#648',
        courseName: 'Data science fundamentals',
        category: 'Science',
        instructor: 'Lea Lewis',
        enrolledStudents: '99',
        startDate: '15 Aug, 2024',
        endDate: '15 Dec, 2024',
        price: '$25.99',
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#945',
        courseName: 'Graphic design basics',
        category: 'Arts & design',
        instructor: 'Lillie Walker',
        enrolledStudents: '75',
        startDate: '01 Sep, 2024',
        endDate: '30 Nov, 2024',
        price: '$19.99',
        status: {
            // active: 'Active',
            deactive: 'Deactive',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#186',
        courseName: 'Web development basics',
        category: 'Technology',
        instructor: 'Lynn Flinn',
        enrolledStudents: '140',
        startDate: '15 Sep, 2024',
        endDate: '30 Dec, 2024',
        price: '$14.99',
        status: {
            active: 'Active',
            // deactive: 'Deactive',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },

    // {
    //     id: '#752',
    //     courseName: 'Advanced app development',
    //     category: 'Technology',
    //     instructor: 'Chad Campos',
    //     enrolledStudents: '90',
    //     startDate: '15 Oct, 2024',
    //     endDate: '30 Dec, 2024',
    //     price: '$22.99',
    //     status: {
    //         // active: 'Active',
    //         deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#658',
    //     courseName: 'Photoshop mastery',
    //     category: 'Photoshop',
    //     instructor: 'Richard Flannery',
    //     enrolledStudents: '60',
    //     startDate: '20 Oct, 2024',
    //     endDate: '30 Dec, 2024',
    //     price: '$42.99',
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#951',
    //     courseName: 'Graphic design principles',
    //     category: 'Design',
    //     instructor: 'Toni Chancellor',
    //     enrolledStudents: '35',
    //     startDate: '25 Oct, 2024',
    //     endDate: '30 Dec, 2024',
    //     price: '$20.99',
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#357',
    //     courseName: 'Python basics',
    //     category: 'Python',
    //     instructor: 'Mary Williams',
    //     enrolledStudents: '50',
    //     startDate: '30 Oct, 2024',
    //     endDate: '30 Dec, 2024',
    //     price: '$14.99',
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#852',
    //     courseName: 'Java programming',
    //     category: 'Technology',
    //     instructor: 'Joel Ogilvie',
    //     enrolledStudents: '40',
    //     startDate: '01 Nov, 2024',
    //     endDate: '30 Dec, 2024',
    //     price: '$32.99',
    //     status: {
    //         // active: 'Active',
    //         deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#852',
    //     courseName: 'Java programming',
    //     category: 'Technology',
    //     instructor: 'Joel Ogilvie',
    //     enrolledStudents: '40',
    //     startDate: '01 Nov, 2024',
    //     endDate: '30 Dec, 2024',
    //     price: '$32.99',
    //     status: {
    //         // active: 'Active',
    //         deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#357',
    //     courseName: 'Python basics',
    //     category: 'Python',
    //     instructor: 'Mary Williams',
    //     enrolledStudents: '50',
    //     startDate: '30 Oct, 2024',
    //     endDate: '30 Dec, 2024',
    //     price: '$14.99',
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#951',
    //     courseName: 'Graphic design principles',
    //     category: 'Design',
    //     instructor: 'Toni Chancellor',
    //     enrolledStudents: '35',
    //     startDate: '25 Oct, 2024',
    //     endDate: '30 Dec, 2024',
    //     price: '$20.99',
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#658',
    //     courseName: 'Photoshop mastery',
    //     category: 'Photoshop',
    //     instructor: 'Richard Flannery',
    //     enrolledStudents: '60',
    //     startDate: '20 Oct, 2024',
    //     endDate: '30 Dec, 2024',
    //     price: '$42.99',
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#752',
    //     courseName: 'Advanced app development',
    //     category: 'Technology',
    //     instructor: 'Chad Campos',
    //     enrolledStudents: '90',
    //     startDate: '15 Oct, 2024',
    //     endDate: '30 Dec, 2024',
    //     price: '$22.99',
    //     status: {
    //         // active: 'Active',
    //         deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#439',
    //     courseName: 'Business finance',
    //     category: 'Business',
    //     instructor: 'Mark Rivera',
    //     enrolledStudents: '50',
    //     startDate: '01 Oct, 2024',
    //     endDate: '30 Dec, 2024',
    //     price: '$20.99',
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#186',
    //     courseName: 'Web development basics',
    //     category: 'Technology',
    //     instructor: 'Lynn Flinn',
    //     enrolledStudents: '140',
    //     startDate: '15 Sep, 2024',
    //     endDate: '30 Dec, 2024',
    //     price: '$14.99',
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#945',
    //     courseName: 'Graphic design basics',
    //     category: 'Arts & design',
    //     instructor: 'Lillie Walker',
    //     enrolledStudents: '75',
    //     startDate: '01 Sep, 2024',
    //     endDate: '30 Nov, 2024',
    //     price: '$19.99',
    //     status: {
    //         // active: 'Active',
    //         deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#648',
    //     courseName: 'Data science fundamentals',
    //     category: 'Science',
    //     instructor: 'Lea Lewis',
    //     enrolledStudents: '99',
    //     startDate: '15 Aug, 2024',
    //     endDate: '15 Dec, 2024',
    //     price: '$25.99',
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // },
    // {
    //     id: '#258',
    //     courseName: 'Introduction to python',
    //     category: 'Technology',
    //     instructor: 'Ann Cohen',
    //     enrolledStudents: '120',
    //     startDate: '01 Aug, 2024',
    //     endDate: '30 Dec, 2024',
    //     price: '$30.99',
    //     status: {
    //         active: 'Active',
    //         // deactive: 'Deactive',
    //     },
    //     action: {
    //         view: 'visibility',
    //         edit: 'edit',
    //         delete: 'delete'
    //     }
    // }
];

export interface PeriodicElement {
    id: string;
    courseName: string;
    category: string;
    instructor: string;
    enrolledStudents: string;
    startDate: string;
    endDate: string;
    price: string;
    status: any;
    action: any;
}