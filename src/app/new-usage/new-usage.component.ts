import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsageService } from '../service/usage.service';
import { Router } from '@angular/router';
import { VehicleService } from '../service/vehicle.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-new-usage',
  templateUrl: './new-usage.component.html',
  styleUrls: ['./new-usage.component.scss'],
})
export class NewUsageComponent  implements OnInit {

  usageForm!: FormGroup;
  vehicles!: any[];
  userId!: number;
  errorMessage!: string;
  previousPage: string = '/home';

  constructor(
    private builder: FormBuilder, 
    private toastr: ToastrService, 
    private usageService: UsageService,
    private vehicleService: VehicleService,
    private userService: UserService,
    private router: Router,
    
    ) { }

  ngOnInit() {
    // create a form group
    this.usageForm = this.builder.group({
      vehicle_id:this.builder.control('',Validators.required),
      user_id:this.builder.control(''),
      duration:this.builder.control('',Validators.compose([Validators.required, Validators.min(0)])),
      date:this.builder.control('',Validators.required),
      fuel_amount:this.builder.control('', Validators.compose([Validators.required, Validators.min(0)]), /*Validators.pattern('^[0-9]*$')*/),
      maintenance_cost:this.builder.control('', Validators.compose([Validators.required, Validators.min(0)]), /*Validators.pattern('^[0-9]*$')*/),
      note:this.builder.control('')
  });

    // Fetch vehicle list for dropdown
    this.vehicleService.getVehicles().subscribe({
      next: (vehicledata: any) => {
        this.vehicles = vehicledata;
      },
      error: (error: any) => {
        console.log(error.error.message);
      }
    });

    // Get user id from token
    this.userId = this.userService.getUserId();
  }
  
  // get the form controls and validate; if valid, call the service (create a user)
  submitUsage(){
    if(this.usageForm.valid){
      const usage = this.usageForm.value;
      // console.log('UserId: ' + this.userId)
      usage.user_id = this.userId;
      // console.log(usage);
      this.usageService.addUsage(this.usageForm.value).subscribe({
        next: (response:any) => {
          console.log(response);
          this.toastr.success('Usage created successfuly');
          let route: string = '/show-vehicle/' + this.usageForm.value.vehicle_id;
          this.router.navigate([route]); // Navigate to vehicle page
        },
        error : (error:any) => {
          console.log(error);
          this.errorMessage = error.error.message;
        }
      });
    } else {
      this.errorMessage = 'Some fields seem to be emtpy or have the wrong format, please fill them out';
    }
  }

}
