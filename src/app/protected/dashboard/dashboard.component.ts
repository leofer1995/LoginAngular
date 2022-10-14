import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user!: User;

  constructor( 
    private router: Router,
    private authService: AuthService
  ) {
    console.log(authService.user)
    this.user = authService.user
  }

  ngOnInit(): void {
  }


  logout() {
    this.router.navigateByUrl('/auth/login');
    this.authService.logout();
  }

}
