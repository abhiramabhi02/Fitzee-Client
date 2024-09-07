import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private authService:AuthService) { }

  
}
