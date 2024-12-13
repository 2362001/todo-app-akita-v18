import { Component, Injector, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../common/common.module';
import { Router } from '@angular/router';
import { commonRoute } from '../../common/route';
import { BaseComponent } from '../../common/base-component';
import { TYPE_NOTIFICATION } from '../../../utils';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent implements OnInit  {
  loginForm: any;
  constructor(
    injector : Injector
  ) {
    super(injector)
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });
  }
  
  override ngOnInit() {
   
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
      this.commonService.openNotification(TYPE_NOTIFICATION.SUCCESS, "Success", "Create Success")
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