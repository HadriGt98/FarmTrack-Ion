import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from '../service/vehicle.service';
import { UsageService } from '../service/usage.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-vehicle',
  templateUrl: './show-vehicle.component.html',
  styleUrls: ['./show-vehicle.component.scss'],
})
export class ShowVehicleComponent {

  vehicle!: any;
  stats!: any;
  usages!: any[]
  previousPage: string = '/vehicle-list';

  constructor(
    private route: ActivatedRoute, 
    private vehicleService: VehicleService,
    private usageService: UsageService,
    private authService: AuthService,
    private router: Router
    ) { 
    const id = this.route.snapshot.paramMap.get('vehicle_id');
    if (id != null) {
      this.vehicle = this.vehicleService.getVehicle((Number(id))).subscribe(
        vehicle => {
          this.vehicle = vehicle;
        });
      this.stats = this.vehicleService.getVehicleStats((Number(id))).subscribe(
        stats => {
          console.log('Stats', stats)
          this.stats = stats;
        });
      this.usageService.getUsages((Number(id))).subscribe({
        next: (usages: any) => {
          console.log('Usages', usages)
          this.usages = usages;
        },
        error: (error: any) => {
          console.log(error.error.message);
        }
        });
    } else {
      console.log('No vehicle id was found');
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  seeUsage(usage_id: number) {
    this.router.navigate(['/edit-usage/' + usage_id]);
  }

}
