import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-sign-in',
    imports: [RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule, NgIf],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

    constructor(
        private fb: FormBuilder,
        private router: Router,
        public themeService: CustomizerSettingsService,
        private authService: AuthService,
        private toast: ToastrService,
        private userService: UsersService
    ) {
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    // Password Hide
    hide = true;
    userProfile: any;
    // Form
    authForm: FormGroup;
    onSubmit() {
        if (this.authForm.valid) {
            const data = this.authForm.value;
            this.authService.login(data).subscribe({
                next: (res: any) => {
                    console.log(res)
                    if (res.success) {
                        localStorage.setItem('token', res.token)
                        localStorage.setItem('role', res.role)
                        this.toast.success(res.message, 'Success')
                        if (res.role !== 'superadmin') {
                            this.getUserProfile();
                        }
                        
                        this.router.navigate(['/']);
                    } else {
                        this.toast.error(res.message, 'Error')
                    }
                },
                error(err) {
                    console.error(err)
                }
            })
            // this.router.navigate(['/']);
        } else {
            console.log('Form is invalid. Please check the fields.');
        }
    }

    getUserProfile() {
        this.userService.getUserProfile().subscribe({
            next: (res: any) => {
                if (res.success) {
                    this.userProfile = res.profile;
                    localStorage.setItem('profile', JSON.stringify(this.userProfile))
                }
            }
        })
    }

}