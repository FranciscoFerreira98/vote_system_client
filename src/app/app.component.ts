import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showMesaBoard = false;
  username?: string;
  isDarkTheme = false;
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;

  constructor(private tokenStorageService: TokenStorageService, private darkModeService: DarkModeService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showMesaBoard = this.roles.includes('ROLE_MESA');

      this.username = user.username;
    }
   
  }
  
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  onToggle(): void {
    this.darkModeService.toggle();
  }
}
