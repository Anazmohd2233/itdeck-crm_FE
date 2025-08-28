import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
    selector: 'app-sales-overview',
    imports: [
        MatCardModule,
        CommonModule,
        MatMenuModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './sales-overview.component.html',
    styleUrl: './sales-overview.component.scss'
})
export class SalesOverviewComponent implements OnInit {
  dateForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
      const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    this.dateForm = this.fb.group({
      start: [firstDay],
      end: [lastDay]
    });
    }

    @Input() progress: number = 100; 


     @Input() data: any;

    totalStrength: any;
    total_collected_data: any;
    balance: any;


     ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
     
      this.totalStrength = this.data?.totalStrength;
      this.total_collected_data = this.data?.total_collected_data;
      this.balance = this.data?.balance;

      this.progress = (this.total_collected_data /this.totalStrength )*100;
    }
  }



 
    
    
    
  
}