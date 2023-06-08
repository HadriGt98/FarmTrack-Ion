import { MaterialModule } from '../material.module'
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../service/auth.service';
import { VehicleService } from '../service/vehicle.service';



@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
  
})
export class VehicleListComponent  implements OnInit {

  vehicles: any[] = [];
  enterKeyPressed: boolean = false;
  displayNoResultsMessage: boolean = false;
  filteredVehicles: any[] = [];
  searchText!: string;
  previousPage: string = '/home';

  constructor(private vehicleService: VehicleService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (vehicledata: any) => {
            this.vehicles = vehicledata;
          },
          error: (error: any) => {
            console.log(error.error.message);
          }
        });
  }

  // searchVehicles(): void {
  //   if (this.searchText) {
  //     this.vehicleService.searchVehicles(this.searchText).subscribe(
  //       (vehicledata: any) => {
  //         this.vehicles = vehicledata;
  //       },
  //       (error: any) => {
  //         console.log(error.error.message);
  //       }
  //     )
  //   } else {
  //     this.getVehicles();
  //   }
  // }

  searchVehicles(): void {
    if (this.searchText && this.enterKeyPressed) {
      this.vehicleService.searchVehicles(this.searchText).subscribe(
        (vehicledata: any) => {
          if (vehicledata.length > 0) {
            this.vehicles = vehicledata;
          } else {
            this.displayNoResultsMessage = true;
            this.vehicles = [];
          }
        },
        (error: any) => {
          if (error.status === 404) {
            this.displayNoResultsMessage = true;
            this.vehicles = [];
          } else {
            console.log(error.error.message);
          }
        }
      );
    } else {
      this.getVehicles();
    }
  }

  onKeyUp(event: KeyboardEvent): void {
    this.enterKeyPressed = event.keyCode === 13;
    if (this.enterKeyPressed) {
      this.searchVehicles();
    } else {
      this.displayNoResultsMessage = false;
    }
  }

  onKeyUpFilter(event: KeyboardEvent): void {
    this.enterKeyPressed = event.keyCode === 13;
    if (this.enterKeyPressed) {
      if (this.searchText) {
        this.filteredVehicles = this.vehicles.filter(vehicle => {
          // Perform the filtering logic based on your requirements
          return (
            vehicle.model_make.toLowerCase().includes(this.searchText.toLowerCase()) ||
            vehicle.nickname.toLowerCase().includes(this.searchText.toLowerCase())
          );
        });
      } else {
        this.filteredVehicles = this.vehicles;
      }
      // Display message when there are no search results
      if (this.filteredVehicles.length === 0) {
        this.filteredVehicles.push({ noResult: true });
      }
    }
  }


  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

}
