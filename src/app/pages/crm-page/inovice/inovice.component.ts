import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
  selector: 'app-inovice',
  imports: [MatCardModule, MatMenuModule, MatButtonModule, MatTableModule, NgIf, MatCheckboxModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './inovice.component.html',
  styleUrls: ['./inovice.component.scss']
})
export class InoviceComponent {
  displayedColumns: string[] = ['courseID', 'courseName', 'description', 'price'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor(
    public themeService: CustomizerSettingsService,
    private router: Router
) {}
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
      courseID: '#951',
      courseName: 'Course 1',
      description: 'Course Description ...',
      price: 50
  }
];

export interface PeriodicElement {
  courseName: string;
  courseID: string;
  description: string;
  price: number;
}