import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  isLoggedIn: boolean = false;
  showAdminBoard: boolean = false;
  showMesaBoard: boolean = false;
  isSuccessful: boolean = false;
  isSignUpFailed: boolean = false;
  errorMessage: any;


  private roles: string[] = [];

  form: any = {
    username: null,
    email: null,
    password: null
  };

  constructor(private tokenStorageService: TokenStorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showMesaBoard = this.roles.includes('ROLE_MESA');
    }
  }

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
