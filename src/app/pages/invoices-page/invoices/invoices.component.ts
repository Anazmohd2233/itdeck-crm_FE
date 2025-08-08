import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule,
    NgIf,
    NgFor
  ],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class InvoicesComponent {
  displayedColumns: string[] = [
    'paymentID',
    'student',
    'email',
    'courseName',
    'courseFee',
    'paidAmount',
    'balanceAmount',
    'installments',
    'nextInstallmentDate',
    'action'
  ];
  dataSource = new MatTableDataSource<PaymentElement>(ELEMENT_DATA);
  selection = new SelectionModel<PaymentElement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('installmentDialog') installmentDialog!: TemplateRef<any>;

  selectedPayment: any;
  installmentCount: number = 2;
  installments: { amount: number; date: string }[] = [];
  courseFee: number = 0;
  balanceAmount: number = 0;

  constructor(
    public themeService: CustomizerSettingsService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openInstallmentDialog(element: any): void {
    this.selectedPayment = element;
    this.courseFee = parseFloat(element.courseFee.replace(/[$,]/g, ''));
    this.installmentCount = 2;
    this.installments = [];
    this.dialog.open(this.installmentDialog, { width: '90vw', maxWidth: '900px' });
  }

  generateInstallments(): void {
    const baseAmount = +(this.courseFee / this.installmentCount).toFixed(2);
    const today = new Date();
    this.installments = [];

    for (let i = 0; i < this.installmentCount; i++) {
      const installmentDate = new Date(today);
      installmentDate.setMonth(today.getMonth() + i + 1);
      const formattedDate = installmentDate.toISOString().split('T')[0];

      this.installments.push({
        amount: baseAmount,
        date: formattedDate
      });
    }

    // Fix last installment for rounding difference
    const totalAssigned = baseAmount * this.installmentCount;
    const diff = +(this.courseFee - totalAssigned).toFixed(2);
    if (diff !== 0) {
      this.installments[this.installmentCount - 1].amount += diff;
    }
  }

  onAmountChange(index: number): void {
    // Calculate sum of all previous installments
    const sumBefore = this.installments
      .slice(0, index)
      .reduce((sum, inst) => sum + inst.amount, 0);

    // Calculate max allowed for this installment
    let maxAllowed = this.courseFee - sumBefore;

    // Prevent negative
    if (this.installments[index].amount < 0) {
      this.installments[index].amount = 0;
    }

    // Restrict to max allowed
    if (this.installments[index].amount > maxAllowed) {
      this.installments[index].amount = maxAllowed;
    }

    // Recalculate sum so far including this installment
    const totalSoFar = sumBefore + this.installments[index].amount;

    // If current installment filled the entire course fee
    if (totalSoFar >= this.courseFee) {
      // Remove remaining installments
      this.installments = this.installments.slice(0, index + 1);
      this.installmentCount = this.installments.length;
    }
  }

  updateAllDates(event: Event): void {
    const newDate = (event.target as HTMLInputElement).value;
    this.installments.forEach(inst => inst.date = newDate);
  }

  saveInstallments() {
    console.log('Installments saved:', this.installments);
    this.dialog.closeAll();
  }

  closeModal(): void {
    this.dialog.closeAll();
  }

  clearInstallments(): void {
    this.installments = [];
    this.installmentCount = 1;
  }
}



const ELEMENT_DATA: PaymentElement[] = [
    {
      paymentID: '#158',
      student: { img: 'images/users/user1.jpg', name: 'Marcia Baker' },
      email: 'marcia@example.com',
      courseName: 'Fullstack Web Development',
      courseFee: '$5,000',
      paidAmount: '$3,000',
      balanceAmount: '$2,000',
      installments: '2/4',
      nextInstallmentDate: 'Jul 15, 2025',
      action: { view: 'visibility', print: 'print', delete: 'delete' }
    },
    {
      paymentID: '#159',
      student: { img: 'images/users/user2.jpg', name: 'Carolyn Barnes' },
      email: 'barnes@example.com',
      courseName: 'Data Science Bootcamp',
      courseFee: '$8,750',
      paidAmount: '$4,500',
      balanceAmount: '$4,250',
      installments: '3/5',
      nextInstallmentDate: 'Jul 20, 2025',
      action: { view: 'visibility', print: 'print', delete: 'delete' }
    },
    {
      paymentID: '#160',
      student: { img: 'images/users/user3.jpg', name: 'Donna Miller' },
      email: 'donna@example.com',
      courseName: 'Python for Beginners',
      courseFee: '$3,200',
      paidAmount: '$1,550',
      balanceAmount: '$1,650',
      installments: '2/4',
      nextInstallmentDate: 'Jul 10, 2025',
      action: { view: 'visibility', print: 'print', delete: 'delete' }
    },
    {
      paymentID: '#161',
      student: { img: 'images/users/user4.jpg', name: 'Barbara Cross' },
      email: 'cross@example.com',
      courseName: 'UX/UI Design Mastery',
      courseFee: '$3,750',
      paidAmount: '$2,490',
      balanceAmount: '$1,260',
      installments: '2/3',
      nextInstallmentDate: 'Jul 22, 2025',
      action: { view: 'visibility', print: 'print', delete: 'delete' }
    },
    {
      paymentID: '#162',
      student: { img: 'images/users/user5.jpg', name: 'Rebecca Block' },
      email: 'block@example.com',
      courseName: 'Digital Marketing',
      courseFee: '$6,000',
      paidAmount: '$3,599',
      balanceAmount: '$2,401',
      installments: '2/4',
      nextInstallmentDate: 'Jul 18, 2025',
      action: { view: 'visibility', print: 'print', delete: 'delete' }
    },

    // {
    //   paymentID: '#163',
    //   student: { img: 'images/users/user6.jpg', name: 'Ramiro McCarty' },
    //   email: 'ramiro@example.com',
    //   courseName: 'Cloud Computing',
    //   courseFee: '$9,200',
    //   paidAmount: '$5,800',
    //   balanceAmount: '$3,400',
    //   installments: '3/5',
    //   nextInstallmentDate: 'Jul 25, 2025',
    //   action: { view: 'visibility', print: 'print', delete: 'delete' }
    // },
    // {
    //   paymentID: '#164',
    //   student: { img: 'images/users/user7.jpg', name: 'Robert Fairweather' },
    //   email: 'robert@example.com',
    //   courseName: 'JavaScript Advanced',
    //   courseFee: '$2,500',
    //   paidAmount: '$1,200',
    //   balanceAmount: '$1,300',
    //   installments: '1/3',
    //   nextInstallmentDate: 'Jul 14, 2025',
    //   action: { view: 'visibility', print: 'print', delete: 'delete' }
    // },
    // {
    //   paymentID: '#165',
    //   student: { img: 'images/users/user8.jpg', name: 'Marcelino Haddock' },
    //   email: 'haddock@example.com',
    //   courseName: 'Machine Learning',
    //   courseFee: '$7,300',
    //   paidAmount: '$4,850',
    //   balanceAmount: '$2,450',
    //   installments: '3/4',
    //   nextInstallmentDate: 'Jul 28, 2025',
    //   action: { view: 'visibility', print: 'print', delete: 'delete' }
    // },
    // {
    //   paymentID: '#166',
    //   student: { img: 'images/users/user9.jpg', name: 'Thomas Wilson' },
    //   email: 'wildon@example.com',
    //   courseName: 'React Fundamentals',
    //   courseFee: '$4,800',
    //   paidAmount: '$2,300',
    //   balanceAmount: '$2,500',
    //   installments: '2/4',
    //   nextInstallmentDate: 'Jul 12, 2025',
    //   action: { view: 'visibility', print: 'print', delete: 'delete' }
    // },
    // {
    //   paymentID: '#167',
    //   student: { img: 'images/users/user10.jpg', name: 'Nathaniel Hulsey' },
    //   email: 'hulsey@example.com',
    //   courseName: 'Cyber Security',
    //   courseFee: '$6,500',
    //   paidAmount: '$4,560',
    //   balanceAmount: '$1,940',
    //   installments: '3/4',
    //   nextInstallmentDate: 'Jul 16, 2025',
    //   action: { view: 'visibility', print: 'print', delete: 'delete' }
    // },
    // // 15 more dummy entries
    // {
    //   paymentID: '#168',
    //   student: { img: 'images/users/user11.jpg', name: 'Samantha Lee' },
    //   email: 'samantha@example.com',
    //   courseName: 'Android Development',
    //   courseFee: '$5,500',
    //   paidAmount: '$3,000',
    //   balanceAmount: '$2,500',
    //   installments: '2/4',
    //   nextInstallmentDate: 'Jul 21, 2025',
    //   action: { view: 'visibility', print: 'print', delete: 'delete' }
    // },
    // {
    //   paymentID: '#169',
    //   student: { img: 'images/users/user12.jpg', name: 'Liam Harris' },
    //   email: 'liam@example.com',
    //   courseName: 'iOS App Development',
    //   courseFee: '$7,800',
    //   paidAmount: '$5,000',
    //   balanceAmount: '$2,800',
    //   installments: '3/5',
    //   nextInstallmentDate: 'Jul 19, 2025',
    //   action: { view: 'visibility', print: 'print', delete: 'delete' }
    // },
    // {
    //   paymentID: '#170',
    //   student: { img: 'images/users/user13.jpg', name: 'Olivia Martin' },
    //   email: 'olivia@example.com',
    //   courseName: 'Backend Engineering',
    //   courseFee: '$8,200',
    //   paidAmount: '$6,200',
    //   balanceAmount: '$2,000',
    //   installments: '4/5',
    //   nextInstallmentDate: 'Jul 23, 2025',
    //   action: { view: 'visibility', print: 'print', delete: 'delete' }
    // },
    // {
    //   paymentID: '#171',
    //   student: { img: 'images/users/user14.jpg', name: 'William Brown' },
    //   email: 'william@example.com',
    //   courseName: 'Blockchain Essentials',
    //   courseFee: '$9,500',
    //   paidAmount: '$7,000',
    //   balanceAmount: '$2,500',
    //   installments: '3/4',
    //   nextInstallmentDate: 'Jul 27, 2025',
    //   action: { view: 'visibility', print: 'print', delete: 'delete' }
    // },
    // {
    //   paymentID: '#172',
    //   student: { img: 'images/users/user15.jpg', name: 'Emily Davis' },
    //   email: 'emily@example.com',
    //   courseName: 'AI & Deep Learning',
    //   courseFee: '$10,000',
    //   paidAmount: '$6,500',
    //   balanceAmount: '$3,500',
    //   installments: '3/5',
    //   nextInstallmentDate: 'Jul 24, 2025',
    //   action: { view: 'visibility', print: 'print', delete: 'delete' }
    // },
    // {
    //   paymentID: '#173',
    //   student: { img: 'images/users/user16.jpg', name: 'Lucas Walker' },
    //   email: 'lucas@example.com',
    //   courseName: 'DevOps Fundamentals',
    //   courseFee: '$7,000',
    //   paidAmount: '$4,200',
    //   balanceAmount: '$2,800',
    //   installments: '2/4',
    //   nextInstallmentDate: 'Jul 30, 2025',
    //   action: { view: 'visibility', print: 'print', delete: 'delete' }
    // },
    // {
    //   paymentID: '#174',
    //   student: { img: 'images/users/user17.jpg', name: 'Sophia Young' },
    //   email: 'sophia@example.com',
    //   courseName: 'Big Data Analytics',
    //   courseFee: '$8,500',
    //   paidAmount: '$5,500',
    //   balanceAmount: '$3,000',
    //   installments: '3/5',
    //   nextInstallmentDate: 'Jul 22, 2025',
    //   action: { view: 'visibility', print: 'print', delete: 'delete' }
    // },
    // {
    //   paymentID: '#175',
    //   student: { img: 'images/users/user18.jpg', name: 'James Allen' },
    //   email: 'james@example.com',
    //   courseName: 'C++ Mastery',
    //   courseFee: '$6,800',
    //   paidAmount: '$3,800',
    //   balanceAmount: '$3,000',
    //   installments: '2/4',
    //   nextInstallmentDate: 'Jul 18, 2025',
    //   action: { view: 'visibility', print: 'print', delete: 'delete' }
    // },
    // {
    //   paymentID: '#176',
    //   student: { img: 'images/users/user19.jpg', name: 'Ava Scott' },
    //   email: 'ava@example.com',
    //   courseName: 'SQL & Database Design',
    //   courseFee: '$4,500',
    //   paidAmount: '$2,500',
    //   balanceAmount: '$2,000',
    //   installments: '2/3',
    //   nextInstallmentDate: 'Jul 15, 2025',
    //   action: { view: 'visibility', print: 'print', delete: 'delete' }
    // },
    // {
    //   paymentID: '#177',
    //   student: { img: 'images/users/user20.jpg', name: 'Henry Moore' },
    //   email: 'henry@example.com',
    //   courseName: 'AR/VR Development',
    //   courseFee: '$9,000',
    //   paidAmount: '$5,500',
    //   balanceAmount: '$3,500',
    //   installments: '3/5',
    //   nextInstallmentDate: 'Jul 29, 2025',
    //   action: { view: 'visibility', print: 'print', delete: 'delete' }
    // },
    // {
    //   paymentID: '#178',
    //   student: { img: 'images/users/user21.jpg', name: 'Isabella Turner' },
    //   email: 'isabella@example.com',
    //   courseName: 'Project Management',
    //   courseFee: '$7,600',
    //   paidAmount: '$4,000',
    //   balanceAmount: '$3,600',
    //   installments: '2/4',
    //   nextInstallmentDate: 'Jul 26, 2025',
    //   action: { view: 'visibility', print: 'print', delete: 'delete' }
    // },
    // {
    //   paymentID: '#179',
    //   student: { img: 'images/users/user22.jpg', name: 'Daniel White' },
    //   email: 'daniel@example.com',
    //   courseName: 'Graphic Design Pro',
    //   courseFee: '$6,200',
    //   paidAmount: '$3,700',
    //   balanceAmount: '$2,500',
    //   installments: '2/4',
    //   nextInstallmentDate: 'Jul 21, 2025',
    //   action: { view: 'visibility', print: 'print', delete: 'delete' }
    // },
    // {
    //   paymentID: '#180',
    //   student: { img: 'images/users/user23.jpg', name: 'Mia Hall' },
    //   email: 'mia@example.com',
    //   courseName: 'Business Analytics',
    //   courseFee: '$8,700',
    //   paidAmount: '$5,000',
    //   balanceAmount: '$3,700',
    //   installments: '3/5',
    //   nextInstallmentDate: 'Jul 17, 2025',
    //   action: { view: 'visibility', print: 'print', delete: 'delete' }
    // },
    // {
    //   paymentID: '#181',
    //   student: { img: 'images/users/user24.jpg', name: 'Matthew Lewis' },
    //   email: 'matthew@example.com',
    //   courseName: 'Software Testing',
    //   courseFee: '$5,900',
    //   paidAmount: '$3,200',
    //   balanceAmount: '$2,700',
    //   installments: '2/4',
    //   nextInstallmentDate: 'Jul 19, 2025',
    //   action: { view: 'visibility', print: 'print', delete: 'delete' }
    // },
    // {
    //   paymentID: '#182',
    //   student: { img: 'images/users/user25.jpg', name: 'Ella Nelson' },
    //   email: 'ella@example.com',
    //   courseName: 'Agile Methodologies',
    //   courseFee: '$6,400',
    //   paidAmount: '$4,000',
    //   balanceAmount: '$2,400',
    //   installments: '2/4',
    //   nextInstallmentDate: 'Jul 20, 2025',
    //   action: { view: 'visibility', print: 'print', delete: 'delete' }
    // },
    // {
    //     paymentID: '#183',
    //     student: { img: 'images/users/user1.jpg', name: 'Marcia Baker' },
    //     email: 'marcia@example.com',
    //     courseName: 'Advanced React',
    //     courseFee: '$5,500',
    //     paidAmount: '$3,500',
    //     balanceAmount: '$2,000',
    //     installments: '2/4',
    //     nextInstallmentDate: 'Jul 22, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#184',
    //     student: { img: 'images/users/user2.jpg', name: 'Carolyn Barnes' },
    //     email: 'barnes@example.com',
    //     courseName: 'Leadership Skills',
    //     courseFee: '$4,000',
    //     paidAmount: '$2,000',
    //     balanceAmount: '$2,000',
    //     installments: '1/3',
    //     nextInstallmentDate: 'Jul 24, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#185',
    //     student: { img: 'images/users/user3.jpg', name: 'Donna Miller' },
    //     email: 'donna@example.com',
    //     courseName: 'Java Fundamentals',
    //     courseFee: '$6,500',
    //     paidAmount: '$4,500',
    //     balanceAmount: '$2,000',
    //     installments: '3/4',
    //     nextInstallmentDate: 'Jul 26, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#186',
    //     student: { img: 'images/users/user4.jpg', name: 'Barbara Cross' },
    //     email: 'cross@example.com',
    //     courseName: 'Photoshop Mastery',
    //     courseFee: '$3,900',
    //     paidAmount: '$2,900',
    //     balanceAmount: '$1,000',
    //     installments: '2/3',
    //     nextInstallmentDate: 'Jul 23, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#187',
    //     student: { img: 'images/users/user5.jpg', name: 'Rebecca Block' },
    //     email: 'block@example.com',
    //     courseName: 'Product Management',
    //     courseFee: '$7,200',
    //     paidAmount: '$4,000',
    //     balanceAmount: '$3,200',
    //     installments: '2/4',
    //     nextInstallmentDate: 'Jul 25, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#188',
    //     student: { img: 'images/users/user6.jpg', name: 'Ramiro McCarty' },
    //     email: 'ramiro@example.com',
    //     courseName: 'Frontend with Angular',
    //     courseFee: '$8,100',
    //     paidAmount: '$5,100',
    //     balanceAmount: '$3,000',
    //     installments: '3/5',
    //     nextInstallmentDate: 'Jul 27, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#189',
    //     student: { img: 'images/users/user7.jpg', name: 'Robert Fairweather' },
    //     email: 'robert@example.com',
    //     courseName: 'SQL Advanced',
    //     courseFee: '$4,500',
    //     paidAmount: '$2,500',
    //     balanceAmount: '$2,000',
    //     installments: '2/3',
    //     nextInstallmentDate: 'Jul 29, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#190',
    //     student: { img: 'images/users/user8.jpg', name: 'Marcelino Haddock' },
    //     email: 'haddock@example.com',
    //     courseName: 'Networking Basics',
    //     courseFee: '$5,800',
    //     paidAmount: '$3,300',
    //     balanceAmount: '$2,500',
    //     installments: '2/4',
    //     nextInstallmentDate: 'Jul 28, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#191',
    //     student: { img: 'images/users/user9.jpg', name: 'Thomas Wilson' },
    //     email: 'wildon@example.com',
    //     courseName: 'Kotlin for Android',
    //     courseFee: '$6,000',
    //     paidAmount: '$3,000',
    //     balanceAmount: '$3,000',
    //     installments: '2/4',
    //     nextInstallmentDate: 'Jul 30, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#192',
    //     student: { img: 'images/users/user10.jpg', name: 'Nathaniel Hulsey' },
    //     email: 'hulsey@example.com',
    //     courseName: 'AI Strategy',
    //     courseFee: '$9,500',
    //     paidAmount: '$5,500',
    //     balanceAmount: '$4,000',
    //     installments: '3/5',
    //     nextInstallmentDate: 'Aug 1, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#193',
    //     student: { img: 'images/users/user11.jpg', name: 'Samantha Lee' },
    //     email: 'samantha@example.com',
    //     courseName: 'Financial Analysis',
    //     courseFee: '$7,600',
    //     paidAmount: '$4,000',
    //     balanceAmount: '$3,600',
    //     installments: '2/4',
    //     nextInstallmentDate: 'Aug 3, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#194',
    //     student: { img: 'images/users/user12.jpg', name: 'Liam Harris' },
    //     email: 'liam@example.com',
    //     courseName: 'AWS Cloud Architect',
    //     courseFee: '$9,800',
    //     paidAmount: '$6,000',
    //     balanceAmount: '$3,800',
    //     installments: '3/5',
    //     nextInstallmentDate: 'Jul 31, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#195',
    //     student: { img: 'images/users/user13.jpg', name: 'Olivia Martin' },
    //     email: 'olivia@example.com',
    //     courseName: 'DevSecOps Fundamentals',
    //     courseFee: '$8,900',
    //     paidAmount: '$4,900',
    //     balanceAmount: '$4,000',
    //     installments: '3/5',
    //     nextInstallmentDate: 'Aug 2, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#196',
    //     student: { img: 'images/users/user14.jpg', name: 'William Brown' },
    //     email: 'william@example.com',
    //     courseName: 'Robotics Programming',
    //     courseFee: '$10,500',
    //     paidAmount: '$6,500',
    //     balanceAmount: '$4,000',
    //     installments: '3/5',
    //     nextInstallmentDate: 'Aug 4, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#197',
    //     student: { img: 'images/users/user15.jpg', name: 'Emily Davis' },
    //     email: 'emily@example.com',
    //     courseName: 'Video Editing Pro',
    //     courseFee: '$5,400',
    //     paidAmount: '$3,000',
    //     balanceAmount: '$2,400',
    //     installments: '2/4',
    //     nextInstallmentDate: 'Aug 1, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#198',
    //     student: { img: 'images/users/user16.jpg', name: 'Lucas Walker' },
    //     email: 'lucas@example.com',
    //     courseName: 'Go Language Mastery',
    //     courseFee: '$7,500',
    //     paidAmount: '$4,000',
    //     balanceAmount: '$3,500',
    //     installments: '2/4',
    //     nextInstallmentDate: 'Aug 3, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#199',
    //     student: { img: 'images/users/user17.jpg', name: 'Sophia Young' },
    //     email: 'sophia@example.com',
    //     courseName: 'Flutter Mobile Dev',
    //     courseFee: '$6,700',
    //     paidAmount: '$3,700',
    //     balanceAmount: '$3,000',
    //     installments: '2/4',
    //     nextInstallmentDate: 'Aug 5, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#200',
    //     student: { img: 'images/users/user18.jpg', name: 'James Allen' },
    //     email: 'james@example.com',
    //     courseName: 'Excel for Business',
    //     courseFee: '$3,500',
    //     paidAmount: '$2,000',
    //     balanceAmount: '$1,500',
    //     installments: '1/3',
    //     nextInstallmentDate: 'Aug 2, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#201',
    //     student: { img: 'images/users/user19.jpg', name: 'Ava Scott' },
    //     email: 'ava@example.com',
    //     courseName: 'Game Development with Unity',
    //     courseFee: '$8,300',
    //     paidAmount: '$4,300',
    //     balanceAmount: '$4,000',
    //     installments: '2/4',
    //     nextInstallmentDate: 'Aug 6, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#202',
    //     student: { img: 'images/users/user20.jpg', name: 'Henry Moore' },
    //     email: 'henry@example.com',
    //     courseName: 'Advanced Cybersecurity',
    //     courseFee: '$9,700',
    //     paidAmount: '$5,700',
    //     balanceAmount: '$4,000',
    //     installments: '3/5',
    //     nextInstallmentDate: 'Aug 7, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#203',
    //     student: { img: 'images/users/user21.jpg', name: 'Isabella Turner' },
    //     email: 'isabella@example.com',
    //     courseName: 'HR Analytics',
    //     courseFee: '$6,100',
    //     paidAmount: '$3,500',
    //     balanceAmount: '$2,600',
    //     installments: '2/4',
    //     nextInstallmentDate: 'Aug 8, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#204',
    //     student: { img: 'images/users/user22.jpg', name: 'Daniel White' },
    //     email: 'daniel@example.com',
    //     courseName: 'Ethical Hacking',
    //     courseFee: '$7,900',
    //     paidAmount: '$4,900',
    //     balanceAmount: '$3,000',
    //     installments: '2/4',
    //     nextInstallmentDate: 'Aug 9, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#205',
    //     student: { img: 'images/users/user23.jpg', name: 'Mia Hall' },
    //     email: 'mia@example.com',
    //     courseName: 'Marketing Strategy',
    //     courseFee: '$5,700',
    //     paidAmount: '$3,200',
    //     balanceAmount: '$2,500',
    //     installments: '2/4',
    //     nextInstallmentDate: 'Aug 10, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#206',
    //     student: { img: 'images/users/user24.jpg', name: 'Matthew Lewis' },
    //     email: 'matthew@example.com',
    //     courseName: 'Microsoft Azure',
    //     courseFee: '$8,400',
    //     paidAmount: '$4,500',
    //     balanceAmount: '$3,900',
    //     installments: '2/4',
    //     nextInstallmentDate: 'Aug 11, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   },
    //   {
    //     paymentID: '#207',
    //     student: { img: 'images/users/user25.jpg', name: 'Ella Nelson' },
    //     email: 'ella@example.com',
    //     courseName: 'Creative Writing',
    //     courseFee: '$3,900',
    //     paidAmount: '$2,000',
    //     balanceAmount: '$1,900',
    //     installments: '1/3',
    //     nextInstallmentDate: 'Aug 12, 2025',
    //     action: { view: 'visibility', print: 'print', delete: 'delete' }
    //   }
  ];
  

export interface PaymentElement {
    paymentID: string;
    student: {
      img: string;
      name: string;
    };
    email: string;
    courseName: string;
    courseFee: string;
    paidAmount: string;
    balanceAmount: string;
    installments: string; // e.g., "2/4"
    nextInstallmentDate: string;
    action: {
      view: string;
      print: string;
      delete: string;
    };
  }
  