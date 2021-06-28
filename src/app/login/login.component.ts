import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error = false;
  email = '';

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(values: { email: string, password: string }): void {
    if (values?.email && values?.password)
      this.loginService.login(values).subscribe(x => {
        if (x) {
          console.log(x);
        } else {
          this.error = true;
        }
      })
    else {
      this.error = true;
    }
  }

}
