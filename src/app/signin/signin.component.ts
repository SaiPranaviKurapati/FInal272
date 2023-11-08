import { Component } from '@angular/core';
import { AuthService } from './signin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class LoginComponent {
  username: string = ''
  password: string = ''

  constructor(private authService: AuthService, private router: Router) {}

  loginSubmitted() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/dashboard']);
        return alert("success") 
      },
      (error) => {
        console.error(error);
        this.router.navigate(['/signin']);
        return alert("Incorrect Username or Password");
      }
    );
  }
}
