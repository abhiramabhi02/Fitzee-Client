import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService, private sharedService:SharedService) {}

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
      return next.handle(modifiedReq).pipe(
        tap((event:HttpEvent<any>)=>{
          if(event instanceof HttpResponse){
            console.log(event, 'event in token');
            if(event.status !== 200){
              this.sharedService.showAlert(event.body.message)
            }
          }
        },
      (error:any)=>{
        if(error instanceof HttpErrorResponse){
          console.log(error.error.message, 'err in token');
          this.sharedService.showAlert(error.error.message)
          
        }
      }
        )
      )
    }

    return next.handle(request).pipe(
      tap((event:HttpEvent<any>)=>{
        if(event instanceof HttpResponse){
          console.log(event, 'event in no token');
          
        }
      },
    (error:any)=>{
      if(error instanceof HttpErrorResponse){
        console.log(error, 'err in no token');
        this.sharedService.showAlert(error.error.message)
      }
    }
  )
    )
  }
}
