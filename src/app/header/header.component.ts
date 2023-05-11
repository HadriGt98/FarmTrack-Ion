import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input() previousPage!: String;

  constructor(private userService: UserService, private router: Router) {}

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  back() {
    this.router.navigate([this.previousPage])
  }

  isHomePage(): boolean {
    return window.location.href.includes("home");
}

}
