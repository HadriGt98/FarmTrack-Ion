import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsageService } from '../service/usage.service';
import { VehicleService } from '../service/vehicle.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-usage',
  templateUrl: './edit-usage.component.html',
  styleUrls: ['./edit-usage.component.scss'],
})
export class EditUsageComponent  implements OnInit {

  updateUsageForm: FormGroup = new FormGroup({
    vehicle_id: new FormControl(''),
    user_id: new FormControl(''),
    duration: new FormControl(''),
    date: new FormControl(''),
    fuel_amount: new FormControl(''),
    maintenance_cost: new FormControl(''),
    note: new FormControl(''),
  });
  usage!: any
  vehicles!: any[];
  userId!: number;
  vehicleId!: any;
  errorMessage!: string;
  previousPage!: string;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private usageService: UsageService,
    private vehicleService: VehicleService
    ) { }
    
    ngOnInit(): void {

    // Fetch vehicle list for dropdown
    this.vehicleService.getVehicles().subscribe({
      next: (vehicledata: any) => {
        this.vehicles = vehicledata;
      },
      error: (error: any) => {
        this.errorMessage = error.error.message;
        console.log(error.error.message);
      }
    });

    const id = this.route.snapshot.paramMap.get('usage_id');
    if (id != null) {
      this.usage = this.usageService.getUsage((Number(id))).subscribe(
        (usage: any) => {
          this.usage = usage;
          this.vehicleId = this.usage.vehicle_id;
          this.previousPage = '/show-vehicle/' + this.vehicleId;
          console.log(this.usage);
          this.updateUsageForm = this.formBuilder.group({
            vehicle_id: [this.usage.vehicle_id, Validators.required],
            user_id: [this.usage.user_id, Validators.required],
            duration: [this.usage.duration, Validators.compose([Validators.required, Validators.min(0)])],
            date: [this.usage.date, Validators.required],
            fuel_amount: [this.usage.fuel_amount, Validators.compose([Validators.required, Validators.min(0)])],
            maintenance_cost: [this.usage.maintenance_cost, Validators.compose([Validators.required, Validators.min(0)])],
            note: [this.usage.note],
          });
        },
        (error) => {
          console.log(error);
        });
    } else {
      this.errorMessage = 'Usage Id was not found';
      console.log('Usage Id was not found');
    }
  }
  
    submitUsageUpdate() {
      if(this.updateUsageForm.valid){
        this.usageService.updateUsage(this.usage.usage_id, this.updateUsageForm.value).subscribe({
          next: (response:any) => {
            console.log(response);
            this.toastr.success('Vehicle updated successfuly');
            let route: string = '/show-vehicle/' + this.vehicleId;
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
  
    deleteUsage() {
      if(confirm("Are you sure you want to delete this usage?")) {
      this.usageService.deleteUsage(this.usage.usage_id).subscribe({
        next: (response:any) => {
          console.log(response);
          this.toastr.success(response.message); // check if this still works...
          let route: string = '/show-vehicle/' + this.vehicleId;
          this.router.navigate([route]); // Navigate to vehicle page
        },
        error : (error:any) => {
          console.log(error);
          this.errorMessage = error.error.message;
        }
      });
    }
   }

}
