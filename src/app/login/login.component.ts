import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {

  errorMessage!: string;

  constructor(private builder: FormBuilder, private service: UserService, private router: Router) {

  }
  
  // create a form group
  loginform = this.builder.group({
    username:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.required)
  });
  
  // get the form controls and validate; if valid, call the service (create a user)
  submitLogin(){
    if(this.loginform.valid){
      this.service.loginUser(this.loginform.value).subscribe({
        next: (response:any) => {
          console.log(response);
          localStorage.setItem('token', response.token)
          this.router.navigate(['/home']);
        },
        error : (error:any) => {
          console.log(error);
          this.errorMessage = error.error.message;
        }
      });
    } else {
      this.errorMessage = 'Some fields seem to be emtpy, please fill them out';
    }
  }

}
