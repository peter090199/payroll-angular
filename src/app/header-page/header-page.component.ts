import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css'],

})
export class HeaderPageComponent implements OnInit {

  animateCards = false;

  triggerAnimation() {
    this.animateCards = !this.animateCards; // Toggle to trigger animation
  }
  isLoading = true; // Start with loading true
  onNavItemClick(sidenav: MatSidenav) {
    sidenav.close();
    
  }
  isClicked = false;

  handleClick() {
    this.isClicked = !this.isClicked;
    setTimeout(() => {
      this.isClicked = false; // Reset after the transition
    }, 300); 
  }
  isMobile$!: Observable<boolean>;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver,private logoutService:LoginService) {}

  ngOnInit(): void {
    this.isMobile$ = this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
    this.loadData();
  }
  loadData() {
    // Simulate loading with a timeout (replace this with actual data fetching)
    setTimeout(() => {
      this.isLoading = false; // Set loading to false after data is fetched
    }, 3000); // Adjust time as necessary
  }
  logout() {
    this.logoutService.logout();
  }
}