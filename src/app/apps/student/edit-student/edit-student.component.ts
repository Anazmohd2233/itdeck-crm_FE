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
import { CourseService } from '../../../services/course.service';
import { LeadStatus } from '../../../services/enums';

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
  editMode:boolean = false;
  courses: any;
        page: number = 1;
    LeadStatus = LeadStatus; // <-- Make enum accessible in HTML

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
      private toastr: ToastrService,
                              private courseService: CourseService,
      
  ) {
     
  }

  ngOnInit(): void {
      this.getCourseList();
      
      if (isPlatformBrowser(this.platformId)) {
          this.editor = new Editor();
      }

      // Get student ID from route parameters
       // ✅ Get ID from query params
        this.route.queryParams.subscribe((params) => {
            this.studentId = params['student_id'] || null;

            console.log('📌 Received student ID:', this.studentId);

            

            if (this.studentId) {
                this.editMode = true;
                this.loadStudentData();
            }
        });

        this.initializeForm();
  }

  ngOnDestroy(): void {
      if (isPlatformBrowser(this.platformId) && this.editor) {
          this.editor.destroy();
      }
  }

  private initializeForm(): void {
      this.studentForm = this.formBuilder.group({
          student_name: ['', [Validators.required, Validators.minLength(2)]],
          email: ['', [Validators.required]],
          phone: ['', [Validators.required,]],
        //   lead_source: ['', Validators.required],
          courses: ['', Validators.required],
        //   status: ['', Validators.required],
          description: ['']
      });
  }

  private loadStudentData(): void {
      if (!this.studentId) return;

      this.isLoading = true;
      this.studentService.getStudentById(this.studentId).subscribe({
          next: (response) => {
              if (response && response.success) {
                  const student = response.customer;
                  
                  // Populate form with student data
                  this.studentForm.patchValue({
                      student_name: student.customer_name || '',
                      email: student.email || '',
                      phone: student.phone || '',
                    //   lead_source: student.lead_source || '',
                      courses: student.courses.id || '',
                    //   status: student.status || '',
                      description: student.description || ''
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
   

      if (this.studentForm.valid && this.studentId) {
          this.isSubmitting = true;

          const formData = {
              student_name: this.studentForm.value.student_name,
              email: this.studentForm.value.email,
              phone: this.studentForm.value.phone,
              lead_source: this.studentForm.value.lead_source,
              courses: this.studentForm.value.courses,
              status: this.studentForm.value.status,
              description: this.studentForm.value.description,
          };

          this.studentService.updateStudent(formData, this.studentId).subscribe({
              next: (response) => {
                  if (response && response.success) {
                      this.toastr.success('Student updated successfully', 'Success');
                    
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





        private getCourseList(): void {
        // let params = new HttpParams();

        // params = params.set('user_type', 'USER');

        this.courseService.getCourse(this.page).subscribe({
            next: (response) => {
                if (response && response.success) {
                    this.courses = response.data?.services || [];
                } else {
                    // this.toastr.error('Failed to load users', 'Failed');
                    console.error('Failed to load courses:', response?.message);
                }
            },
            error: (error) => {
                console.error('API error:', error);
            },
        });
    }
}
