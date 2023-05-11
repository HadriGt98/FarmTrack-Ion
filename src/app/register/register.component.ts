import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  errorMessage!: string;

constructor(private builder: FormBuilder, private toastr: ToastrService, private service: UserService, private router: Router) {

}

// create a form group
registerform=this.builder.group({
  username:this.builder.control('',Validators.required),
  first_name:this.builder.control(''),
  last_name:this.builder.control(''),
  password:this.builder.control('',Validators.required),
});

// get the form controls and validate; if valid, call the service (create a user)
submitRegistration(){
  if(this.registerform.valid){
    this.service.registerUser(this.registerform.value).subscribe({
      next: (response:any) => {
        console.log(response);
        this.toastr.success('Registration successful');
        this.router.navigate(['/login']);
      },
      error : (error:any) => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    });
  } else {
    this.errorMessage = 'Some required fields seem to be emtpy or have the wrong format, please fill them out';
  }
}

}
