import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor, NgClass, DatePipe } from '@angular/common';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatButtonModule, NgIf, NgFor, NgClass, DatePipe],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.scss'

})
export class InvoiceDetailsComponent implements AfterViewInit {
  constructor(public themeService: CustomizerSettingsService) {}

  displayedColumns: string[] = ['no', 'amount', 'status', 'date'];
  dataSource = new MatTableDataSource<Installment>(INSTALLMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}


export interface Installment {
    amount: number;
    status: string;
    date: string;
  }
  
  const INSTALLMENT_DATA: Installment[] = [
    { amount: 150, status: 'Paid', date: '2025-06-30'  },
    { amount: 150, status: 'Pending', date: '2025-07-30'  },
    { amount: 150, status: 'Pending', date: '2025-08-30'  },
    { amount: 150, status: 'Pending', date: '2025-09-30'  }, 
  ];