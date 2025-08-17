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
import { FormGroup, FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentsService } from '../../../services/payments.service';

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

  // Student Form
    isSubmitting = false;
    isLoading = false;
    studentId: any;
    editMode: boolean = false;
    paymentForm!: FormGroup;
    courses: any;
    page: number = 1;
    student: any;
    ELEMENT_DATA: PeriodicElement[] = [];
   displayedColumns: string[] = [
    'student_name',
          'course_name',
          'payment_type',
          'installment_amount',
          'due_date',
          'is_paid',
          'action',
      ];
      dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  
      @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('installmentDialog') installmentDialog!: TemplateRef<any>;

  selectedPayment: any;
  installmentCount: number = 2;
  installments: { amount: number; date: string }[] = [];
  courseFee: number = 0;
  balanceAmount: number = 0;

  constructor(
    public themeService: CustomizerSettingsService,
    private dialog: MatDialog,
      private toastr: ToastrService,
            private paymentsService: PaymentsService,
  ) {}


     ngOnInit(): void {
        // Check if user is authenticated
        this.getPaymentList();

      
    }

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


     private getPaymentList(): void {
        this.paymentsService.getPayment(this.page).subscribe({
            next: (response) => {
                if (response && response.success) {
                    const payments = response.data?.payment || [];

                          this.ELEMENT_DATA = payments.map((u: any) => ({
                        id: u.id,
                        student_id: u.student.id ,
                        student_name: u.student.customer_name || 'N/A',
                        course_name: u.course.service_name || 'N/A',

                        payment_type: u.payment_type || 'N/A',
                        installment_amount: u.installment_amount || 'N/A',
                        due_date: u.due_date || 'N/A',

                        is_paid: u.is_paid,
                       
                        action: '', 
                    }));

                    this.dataSource.data = this.ELEMENT_DATA;
                } else {
                    // this.toastr.error('Failed to load Contact', 'Failed');
                    console.error('Failed to load Payment:', response?.message);
                }
            },
            error: (error) => {
                console.error('API error:', error);
            },
        });
    }
}




  

export interface PeriodicElement {
  student_name:any;
    course_name: any;
    payment_type: any;
    installment_amount: any;
    due_date: any;
    is_paid: any;
    action: any;
}
  