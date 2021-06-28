import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error = false;
  email = '';

  constructor(private loginService: LoginService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(values: { email: string, password: string }): void {
    if (values?.email && values?.password)
      this.loginService.login(values).subscribe(usuario => {
        if (usuario) {
          this.authService.storeUser(usuario);
          this.router.navigate(['']);
          
        } else {
          this.error = true;
        }
      })
    else {
      this.error = true;
    }
  }

}
