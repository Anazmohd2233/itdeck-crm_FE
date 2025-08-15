import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-hd-create-ticket',
  imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, FileUploadModule, NgxMaterialTimepickerModule, NgxEditorModule, NgIf],
  templateUrl: './hd-create-ticket.component.html',
  styleUrls: ['./hd-create-ticket.component.scss'] 
})
export class HdCreateTicketComponent {

  // Text Editor
  editor!: Editor | null; 
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

  // Mock data  
  data: any[] = [
    {
      contact: {
        id: 1,
        name: 'Marcia Baker',
        img: 'images/users/user15.jpg'
      }
    },
    {
      contact: {
        id: 2,
        name: 'Carolyn Barnes',
        img: 'images/users/user7.jpg'
      }
    },
    {
      contact: {
        id: 3,
        name: 'Donna Miller',
        img: 'images/users/user12.jpg'
      }
    },
    {
      contact: {
        id: 4,
        name: 'Barbara Cross',
        img: 'images/users/user5.jpg'
      }
    },
    {
      contact: {
        id: 5,
        name: 'Rebecca Block',
        img: 'images/users/user16.jpg'
      }
    }
  ];

  // File Uploader
  public multiple: boolean = false;

  // Task Form
  taskForm!: FormGroup;
  isSubmitting = false;

  constructor(
      @Inject(PLATFORM_ID) private platformId: Object,
      public themeService: CustomizerSettingsService,
      private taskService: TaskService,
      private router: Router,
      private formBuilder: FormBuilder
  ) {
      this.initializeForm();
  }

  ngOnInit(): void {
      // Check if user is authenticated
      if (!this.taskService.isTokenValid()) {
          console.error('No valid authentication token found');
          this.router.navigate(['/authentication']);
          return;
      }

      if (isPlatformBrowser(this.platformId)) {
          // Initialize the editor only in the browser
          this.editor = new Editor();
      }
  }

  ngOnDestroy(): void {
      if (isPlatformBrowser(this.platformId) && this.editor) {
          this.editor.destroy();
      }
  }

  private initializeForm(): void {
      this.taskForm = this.formBuilder.group({
          task_title: ['', [Validators.required, Validators.minLength(3)]],
          task_type: ['', Validators.required],
          contact_id: ['', Validators.required],
          priority: ['', Validators.required],
          assigned_to: ['', Validators.required],
          due_date: ['', Validators.required],
          due_time: [''],
          note: [''],
          taskImage: [''],
          attachedFiles: ['']
      });
  }

  onSubmit(): void {
      // Check authentication before submitting
      if (!this.taskService.isTokenValid()) {
          console.error('Authentication token expired or missing');
          this.router.navigate(['/authentication']);
          return;
      }

      if (this.taskForm.valid && !this.isSubmitting) {
          this.isSubmitting = true;
          
          const formData = {
              task_title: this.taskForm.value.task_title,
              task_type: this.taskForm.value.task_type,
              contact_id: parseInt(this.taskForm.value.contact_id),
              priority: this.taskForm.value.priority,
              assigned_to: parseInt(this.taskForm.value.assigned_to),
              due_date: this.taskForm.value.due_date,
              note: this.editorContent
          };

          this.taskService.createTask(formData).subscribe({
              next: (response) => {
                  console.log('Task created successfully:', response);
                  // Navigate back to tasks list
                  this.router.navigate(['/task']);
                  this.isSubmitting = false;
              },
              error: (error) => {
                  console.error('Error creating task:', error);
                  this.isSubmitting = false;
                  
                  // Handle authentication errors
                  if (error.status === 401 || error.status === 403) {
                      console.error('Authentication failed, redirecting to login');
                      localStorage.removeItem('Authorization');
                      this.router.navigate(['/authentication']);
                  }
                  // You can add other error handling/notification here
              }
          });
      } else {
          // Mark all fields as touched to show validation errors
          this.markFormGroupTouched();
      }
  }

  onCancel(): void {
      this.router.navigate(['/task']);
  }

  private markFormGroupTouched(): void {
      Object.keys(this.taskForm.controls).forEach(key => {
          const control = this.taskForm.get(key);
          control?.markAsTouched();
      });
  }

  // Getter methods for easy access to form controls in template
  get task_title() { return this.taskForm.get('task_title'); }
  get task_type() { return this.taskForm.get('task_type'); }
  get contact_id() { return this.taskForm.get('contact_id'); }
  get priority() { return this.taskForm.get('priority'); }
  get assigned_to() { return this.taskForm.get('assigned_to'); }
  get due_date() { return this.taskForm.get('due_date'); }

}

export interface PeriodicElement {
    ticketID: string;
    subject: string;
    contact: any;
    createdDate: string;
    dueDate: string;
    requester: string;
    priority: string;
    assignedAgents: any;
    status: any;
    action: any;
}