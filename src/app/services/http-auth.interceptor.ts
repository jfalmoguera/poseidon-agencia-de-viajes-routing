import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

  readonly excludeUrls = ['login'];

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    for (let index = 0; index < this.excludeUrls.length; index++) {
      if (request.url.toLowerCase().includes(this.excludeUrls[index])){
        return next.handle(request);
      }      
    }

    // if (request.url.toLowerCase().includes('login')) {
    //   return next.handle(request);
    // }

    const newRequest = request.clone({ headers: request.headers.set('Authorization', `bearer ${this.authService.bearer}`) });

    return next.handle(newRequest);
  }


}
