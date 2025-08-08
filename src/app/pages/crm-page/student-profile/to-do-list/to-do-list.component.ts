import { NgFor, NgIf } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-to-do-list:not(pp)',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, MatTableModule, RouterLink, NgIf, NgFor, MatCheckboxModule, MatDialogModule, FormsModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatIconModule],
    templateUrl: './to-do-list.component.html',
    styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {

    displayedColumns: string[] = ['select', 'courseID', 'courseName', 'duration', 'joinedDate', 'price', 'paidAmount', 'balanceAmount', 'status', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    @ViewChild('installmentDialog') installmentDialog!: TemplateRef<any>;

    selectedPayment: any;
    installmentCount: number = 2;
    installments: { amount: number; date: string }[] = [];
    courseFee: number = 0;
    balanceAmount: number = 0;
    
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this.dataSource.data);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: PeriodicElement): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.courseID + 1}`;
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    // Popup Trigger
    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    constructor(
        public themeService: CustomizerSettingsService,
        private dialog: MatDialog,
        private router: Router
    ) {}

    navigateToInvoice() {
        this.router.navigate(['/crm-page/invoice'])
    }



  openInstallmentDialog(element: any): void {
    this.selectedPayment = element;
    // this.courseFee = parseFloat(element.price.replace(/[$,]/g, ''))  || element.price;
    this.courseFee = element.price;
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

const ELEMENT_DATA: PeriodicElement[] = [
    {
        courseID: '#951',
        courseName: 'Hotel management system',
        duration: '50 h',
        joinedDate: '15 Nov, 2024',
        price: 50,
        paidAmount: 38,
        balanceAmount: 12,
        status: {
            active: 'Active',
            // inActive: 'In-Active'
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            invoice: 'request_quote',
            delete: 'delete'
        }
    },
    {
        courseID: '#587',
        courseName: 'Send proposal to APR Ltd',
        duration: '35 h',
        joinedDate: '14 Nov, 2024',
        price: 65,
        paidAmount: 0,
        balanceAmount: 65,
        status: {
            active: 'Active',
            // inActive: 'In-Active'
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            invoice: 'request_quote',
            delete: 'delete'
        }
    },
    {
        courseID: '#618',
        courseName: 'Python upgrade',
        duration: '20 h',
        joinedDate: '13 Nov, 2024',
        price: 80,
        paidAmount: 60,
        balanceAmount: 20,
        status: {
            // active: 'Active',
            inActive: 'In-Active'
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            invoice: 'request_quote',
            delete: 'delete'
        }
    },
    {
        courseID: '#367',
        courseName: 'Schedule meeting with Daxa',
        duration: '42 h',
        joinedDate: '12 Nov, 2024',
        price: 25,
        paidAmount: 25,
        balanceAmount: 0,
        status: {
            active: 'Active',
            // inActive: 'In-Active'
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            invoice: 'request_quote',
            delete: 'delete'
        }
    },
    {
        courseID: '#761',
        courseName: 'Engineering lite touch',
        duration: '20 h',
        joinedDate: '11 Nov, 2024',
        price: 35,
        paidAmount: 35,
        balanceAmount: 0,
        status: {
            // active: 'Active',
            inActive: 'In-Active'
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            invoice: 'request_quote',
            delete: 'delete'
        }
    },
    {
        courseID: '#431',
        courseName: 'Refund bill payment',
        duration: '75 h',
        joinedDate: '10 Nov, 2024',
        price: 31,
        paidAmount: 11,
        balanceAmount: 20,
        status: {
            active: 'Active',
            // inActive: 'In-Active'
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            invoice: 'request_quote',
            delete: 'delete'
        }
    }
];

export interface PeriodicElement {
    courseName: string;
    courseID: string;
    duration: string;
    joinedDate: string;
    price: number;
    paidAmount: number;
    balanceAmount:  number
    status: any;
    action: any;
}