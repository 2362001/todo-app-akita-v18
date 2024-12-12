import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../common/common.module';
import { Router } from '@angular/router';
import { commonRoute } from '../../common/route';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit  {
  loginForm: any;
  constructor(public fb: NonNullableFormBuilder , 
    public router : Router
  ) {
  }
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });
  }

  navigateForgot(){}

  navigateRegister(){
    this.router.navigate(['/auth/register']);
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      console.log('submit', this.loginForm.value);
      const formValue = this.loginForm.value;
      if(formValue){
        localStorage.setItem('user_credentials', JSON.stringify({
          username: formValue.username,
          password: formValue.password
        }));
        this.router.navigate([commonRoute.HOME]);
      }
      // You can add your login logic here
      // Example: 
      // this.authService.login(formValue.username, formValue.password).subscribe({
      //   next: (response) => {
      //     // Handle successful login
      //     this.router.navigate(['/dashboard']);
      //   },
      //   error: (error) => {
      //     // Handle login error
      //     console.error('Login failed:', error);
      //   }
      // });
    } else {
      Object.values(this.loginForm.controls).forEach((control :any) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}