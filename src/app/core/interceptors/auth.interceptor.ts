import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('interceptor works');
    

    const role = this.authService.getRole()
    const token = this.authService.getToken(role)

    if(token){
      const modifiedReq = request.clone({
        setHeaders:{
          'Authorization': `Bearer ${token}`
        }
      })
      return next.handle(modifiedReq);
    }

    return next.handle(request);
  }
}
