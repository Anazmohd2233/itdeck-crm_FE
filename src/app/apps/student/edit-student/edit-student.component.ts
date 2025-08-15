import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { StudentService } from '../../../services/student.services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-student',
  imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, FileUploadModule, NgxEditorModule, CommonModule],
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  // Text Editor
  editor!: Editor;
  editorContent: string = '';
  toolbar: Toolbar = [
      ['bold', 'italic'],
      ['underline', 'strike'],
      ['code', 'blockquote'],
      ['ordered_list', 'bullet_list'],
      [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
      ['link', 'image'],
      ['text_color', 'background_color'],
      ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  // File Uploader
  public multiple: boolean = false;

  // Student Form
  studentForm!: FormGroup;
  isSubmitting = false;
  isLoading = false;
  studentId: number | null = null;

  // Options for dropdowns
  leadSources = ['Website', 'Social Media', 'Referral', 'Advertisement', 'Other'];
  courseOptions = ['Web Development', 'Mobile Development', 'Data Science', 'UI/UX Design', 'Digital Marketing'];
  statuses = ['Active', 'Inactive', 'Pending', 'Completed'];

  constructor(
      @Inject(PLATFORM_ID) private platformId: Object,
      public themeService: CustomizerSettingsService,
      private formBuilder: FormBuilder,
      private studentService: StudentService,
      private router: Router,
      private route: ActivatedRoute,
      private toastr: ToastrService
  ) {
      this.initializeForm();
  }

  ngOnInit(): void {
      // Check if user is authenticated
      if (!this.studentService.isTokenValid()) {
          console.error('No valid authentication token found');
          this.router.navigate(['/authentication']);
          return;
      }

      if (isPlatformBrowser(this.platformId)) {
          this.editor = new Editor();
      }

      // Get student ID from route parameters
      this.route.params.subscribe(params => {
          if (params['id']) {
              this.studentId = parseInt(params['id']);
              this.loadStudentData();
          }
      });
  }

  ngOnDestroy(): void {
      if (isPlatformBrowser(this.platformId) && this.editor) {
          this.editor.destroy();
      }
  }

  private initializeForm(): void {
      this.studentForm = this.formBuilder.group({
          student_name: ['', [Validators.required, Validators.minLength(2)]],
          email: ['', [Validators.required, Validators.email]],
          phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
          lead_source: ['', Validators.required],
          courses: ['', Validators.required],
          status: ['', Validators.required],
          notes: ['']
      });
  }

  private loadStudentData(): void {
      if (!this.studentId) return;

      this.isLoading = true;
      this.studentService.getStudentById(this.studentId).subscribe({
          next: (response) => {
              if (response && response.success) {
                  const student = response.data;
                  
                  // Populate form with student data
                  this.studentForm.patchValue({
                      student_name: student.student_name || '',
                      email: student.email || '',
                      phone: student.phone || '',
                      lead_source: student.lead_source || '',
                      courses: student.courses || '',
                      status: student.status || '',
                      notes: student.notes || ''
                  });

                  // Set editor content
                  this.editorContent = student.notes || '';
                  this.isLoading = false;
              } else {
                  this.toastr.error('Failed to load student data', 'Error');
                  this.isLoading = false;
              }
          },
          error: (error) => {
              console.error('Error loading student:', error);
              this.toastr.error('Error loading student data', 'Error');
              this.isLoading = false;

              // Handle authentication errors
              if (error.status === 401 || error.status === 403) {
                  console.error('Authentication failed, redirecting to login');
                  localStorage.removeItem('Authorization');
                  this.router.navigate(['/authentication']);
              }
          }
      });
  }

  onSubmit(): void {
      // Check authentication before submitting
      if (!this.studentService.isTokenValid()) {
          console.error('Authentication token expired or missing');
          this.router.navigate(['/authentication']);
          return;
      }

      if (this.studentForm.valid && !this.isSubmitting && this.studentId) {
          this.isSubmitting = true;

          const formData = {
              student_name: this.studentForm.value.student_name,
              email: this.studentForm.value.email,
              phone: this.studentForm.value.phone,
              lead_source: this.studentForm.value.lead_source,
              courses: this.studentForm.value.courses,
              status: this.studentForm.value.status,
              notes: this.editorContent
          };

          this.studentService.updateStudent(formData, this.studentId).subscribe({
              next: (response) => {
                  if (response && response.success) {
                      this.toastr.success('Student updated successfully', 'Success');
                      this.router.navigate(['/students']);
                  } else {
                      this.toastr.error('Failed to update student', 'Error');
                  }
                  this.isSubmitting = false;
              },
              error: (error) => {
                  console.error('Error updating student:', error);
                  this.toastr.error('Error updating student', 'Error');
                  this.isSubmitting = false;

                  // Handle authentication errors
                  if (error.status === 401 || error.status === 403) {
                      console.error('Authentication failed, redirecting to login');
                      localStorage.removeItem('Authorization');
                      this.router.navigate(['/authentication']);
                  }
              }
          });
      } else {
          this.markFormGroupTouched();
      }
  }

  onCancel(): void {
      this.router.navigate(['/students']);
  }

  private markFormGroupTouched(): void {
      Object.keys(this.studentForm.controls).forEach(key => {
          const control = this.studentForm.get(key);
          control?.markAsTouched();
      });
  }

  // Getter methods for easy access to form controls in template
  get student_name() { return this.studentForm.get('student_name'); }
  get email() { return this.studentForm.get('email'); }
  get phone() { return this.studentForm.get('phone'); }
  get lead_source() { return this.studentForm.get('lead_source'); }
  get courses() { return this.studentForm.get('courses'); }
  get status() { return this.studentForm.get('status'); }
}
