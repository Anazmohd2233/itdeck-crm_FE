import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-sign-in',
    imports: [
        RouterLink,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        NgIf,
    ],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
    authForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        public themeService: CustomizerSettingsService,
        private authService: AuthService,
        private toast: ToastrService,
        private userService: UsersService
    ) {
        this.authForm = this.fb.group({
            username: ['super_admin', [Validators.required]],
            password: ['admin@123', [Validators.required]],
        });
    }

    // Password Hide
    hide = true;
    userProfile: any;
    // Form

    onSubmit(): void {
        if (this.authForm.valid) {
                const formData = new FormData();

                formData.append('username', this.authForm.value.username);
                formData.append('password', this.authForm.value.password);

            this.authService.login(formData).subscribe(
                (response: any) => {
                    if (response.success) {
                         localStorage.setItem('token',response.data.api_key);
                                                  localStorage.setItem('super_admin',response.data.super_admin);

                        console.log('response', response);
                           this.router.navigate(['crm']);
                    } else {
                        this.toast.error(
                            response.message || 'Failed to Login',
                            'Error'
                        );
                        console.error('❌ Add failed:', response.message);
                    }
                },
                (err) => {
                    this.toast.error('Failed to Login', 'Error');
                }
            );
        }
    }

    getUserProfile() {
        this.userService.getUserProfile().subscribe({
            next: (res: any) => {
                if (res.success) {
                    this.userProfile = res.profile;
                    localStorage.setItem(
                        'profile',
                        JSON.stringify(this.userProfile)
                    );
                }
            },
        });
    }
}
