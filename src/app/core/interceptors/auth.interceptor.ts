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

    const role = this.getRole(request)
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
            if(event.status !== 200){
              this.sharedService.showAlert(event.body.message)
            }
          }
        },
      (error:any)=>{
        if(error instanceof HttpErrorResponse){
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
        this.sharedService.showAlert(error.error.message)
      }
    }
  )
    )
  }

  getRole(request:HttpRequest<any>):string{
    let role
    if(request.url.includes('admin')){
      role = 'admin'
      return role
    }else if(request.url.includes('trainer')){
      role = 'trainer'
      return role
    }else{
      role = 'user'
      return role
    }
  }
}
