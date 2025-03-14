import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  username: string | null = null;
  isLoggedIn = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.username$.subscribe((username: string | null) => {
      this.username = username;
      this.isLoggedIn = !!username;  // If username exists, the user is logged in
    });
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      this.isLoggedIn = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
      this.router.navigate(['/']);
      //window.location.reload();

    }
  }
}
