import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  elUsuarioEstaEnLogin = false;

  constructor(private authService: AuthService, private router: Router) {
    // this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((ev: any) => {
    //   console.log(ev.url);
    //   this.elUsuarioEstaEnLogin = ev?.url.toLowerCase().includes('login');
    // });
  }

  cerrarSesion() {
    this.authService.logOutUser();
    this.router.navigate(['login']);
  }

  isUserLogged(): boolean {
    return this.authService.isUserAuthenticated;
  }
}
