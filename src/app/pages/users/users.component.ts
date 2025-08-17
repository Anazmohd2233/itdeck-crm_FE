import { SelectionModel } from '@angular/cdk/collections';
import { isPlatformBrowser, NgIf } from '@angular/common';
import {
    Component,
    Inject,
    PLATFORM_ID,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { ActiveLeadsComponent } from '../crm-page/c-leads/active-leads/active-leads.component';
import { LeadConversionComponent } from '../crm-page/c-leads/lead-conversion/lead-conversion.component';
import { NewLeadsComponent } from '../crm-page/c-leads/new-leads/new-leads.component';
import { RevenueGrowthComponent } from '../crm-page/c-leads/revenue-growth/revenue-growth.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
    FormsModule,
    ReactiveFormsModule,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { toHTML } from 'ngx-editor';

@Component({
    selector: 'app-users',
    imports: [
        RouterLink,
        MatCardModule,
        NgxEditorModule,
        MatTabsModule,
        MatIconModule,
        MatTooltipModule,
        MatCheckboxModule,
        NgIf,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
    ],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
})
export class UsersComponent {
    editor!: Editor | null; // Make it nullable
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

    displayedColumns: string[] = [
        'select',
        'id',
        'name',
        'email',
        'phone',
        'designation',
        'role',
        'password',
        'status',
        'action',
    ];
    dataSource = new MatTableDataSource<PeriodicElement>([]);
    selection = new SelectionModel<PeriodicElement>(true, []);

    usersList: any;
    page: number = 1;
    limit: number = 5;
    userPaginator: any;
    userForm!: FormGroup;
    isEdit = false;
    editingUserId: number | null = null;
    imagePreview: string | ArrayBuffer | null = null;
    imageName: string = '';
    hidePassword = true;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild('userDialog') userDialogTemplate!: any;

    constructor(
        public themeService: CustomizerSettingsService,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private userService: UsersService,
        private toast: ToastrService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    ngAfterViewInit() {
        if (this.paginator) {
            this.paginator.page.subscribe(() => {
                this.page = this.paginator.pageIndex + 1; // paginator is zero-based
                this.limit = this.paginator.pageSize;
                this.fetchUsersList(this.page, this.limit);
            });
        }
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            // Initialize the editor only in the browser
            this.editor = new Editor();
        }
        this.initForm();
        this.fetchUsersList(this.page, this.limit);
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId) && this.editor) {
            this.editor.destroy();
        }
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource?.data?.length ?? 0;
        return numSelected === numRows;
    }

    fetchUsersList(page: number, limit: any) {
        this.userService.getUsers(page, limit).subscribe({
            next: (res: any) => {
                if (res.success) {
                    this.usersList = res.users.map((user: any) => ({
                        ...user,
                        action: {
                            view: 'visibility',
                            edit: 'edit',
                            createTask: 'add_task',
                            delete: 'delete',
                        },
                    }));
                    this.userPaginator = res.pagination;
                    this.dataSource = new MatTableDataSource<PeriodicElement>(
                        this.usersList
                    );
                    // this.dataSource.paginator = this.paginator;
                }
            },
        });
    }

    initForm() {
        this.userForm = this.fb.group({
            name: ['', Validators.required],
            img: [''],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            designation: ['', Validators.required],
            role: ['user', Validators.required],
            password: ['', Validators.required],
            status: ['active', Validators.required],
            description: [''],
        });
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
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
            row.name + 1
        }`;
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openUserForm(user?: PeriodicElement) {
        this.isEdit = !!user;
        if (user) {
            this.userForm.patchValue(user);
            this.editingUserId = user.id;
            this.imagePreview = user.image;
        } else {
            this.userForm.reset({
                role: 'user',
                status: 'active',
                action: {
                    view: 'visibility',
                    edit: 'edit',
                    createTask: 'add_task',
                    delete: 'delete',
                },
            });
            this.editingUserId = null;
        }

        this.dialog.open(this.userDialogTemplate);
    }

    saveUser() {
        const newUser = this.userForm.value;
        // let description;
        // if (!this.isEdit && this.editingUserId === null) {
        //   description = toHTML(newUser?.description);
        // }
        console.log('newUser => <=', newUser);
        const payload: any = {
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            designation: newUser.designation,
            password: newUser.password,
            status: newUser.status,
            image: newUser.img || this.imagePreview,
            role: newUser.role,
            // description: description
        };

        if (this.isEdit && this.editingUserId !== null) {
            this.userService.updateUser(this.editingUserId, payload).subscribe({
                next: (res: any) => {
                    if (res.success) {
                        this.toast.success(res.message, 'Success');
                        this.fetchUsersList(this.page, this.limit);
                        this.dialog.closeAll();
                        this.userForm.reset();
                        this.imageName = '';
                        this.imagePreview = null;
                        this.editingUserId = null;
                    } else this.toast.error(res.message, 'Error');
                },
            });
        } else {
            this.userService.createUser(payload).subscribe({
                next: (res: any) => {
                    if (res.success) {
                        this.toast.success(res.message, 'Success');
                        this.fetchUsersList(this.page, this.limit);
                        this.dialog.closeAll();
                        this.userForm.reset();
                        this.imageName = '';
                        this.imagePreview = null;
                    } else this.toast.error(res.message, 'Error');
                },
            });
        }
    }

    closeModal() {
        this.dialog.closeAll();
    }

    openDeleteUser(user: any, confirmDialog: TemplateRef<any>) {
        this.editingUserId = user.id;
        this.dialog.open(confirmDialog, {
            data: user,
            width: '350px',
        });
    }

    deleteUser() {
        this.userService.deleteUser(Number(this.editingUserId)).subscribe({
            next: (res: any) => {
                if (res.success) {
                    this.toast.success(res.message, 'Success');
                    this.fetchUsersList(this.page, this.limit);
                    this.editingUserId = null;
                    this.closeModal();
                } else this.toast.error(res.message, 'Error');
            },
        });
    }

    onImageChange(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            this.imageName = file.name;

            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result;
                this.userForm.patchValue({ img: reader.result });
            };
            reader.readAsDataURL(file);
        }
    }

    // onStatusChange(status: 'new' | 'inProgress' | 'won' | 'lost') {
    //   // Reset all first
    //   this.userForm.patchValue({
    //     status: { new: '', inProgress: '', won: '', lost: '' }
    //   });
    //   // Set selected
    //   const statusObj: any = {};
    //   statusObj[status] = this.capitalize(status);
    //   this.userForm.patchValue({ status: statusObj });
    // }

    capitalize(str: string) {
        return (
            str.charAt(0).toUpperCase() +
            str
                .slice(1)
                .replace(/([A-Z])/g, ' $1')
                .trim()
        );
    }
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        id: 1,
        name: 'John',
        image: '',
        email: 'marcia@example.com',
        phone: '+1 555-123-4567',
        designation: 'Assistant Manager',
        role: 'user',
        password: 'password@123',
        // created_at: 'Website',
        status: {
            new: 'New',
            // won: 'Won',
            // inProgress: 'In Progress',
            // lost: 'Lost',
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            createTask: 'add_task',
            delete: 'delete',
        },
    },
];
export interface PeriodicElement {
    id: number;
    name: string;
    image: string;
    email: string;
    phone: string;
    designation: string;
    role: 'admin' | 'user';
    password: string;
    // created_at: string;
    status: any;
    action: any;
}
