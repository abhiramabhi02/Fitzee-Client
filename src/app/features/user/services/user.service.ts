import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = environment.user.USER_BASE_URL
  userUrl = environment.user
  constructor(private httpClient: HttpClient, private fb: FormBuilder) {}

  getItems(data: string): Observable<serverResponse> {
    const url = this.baseUrl+ this.userUrl.GET_ITEMS+`?item=${data}`;

    return this.httpClient.get<serverResponse>(url);
  }

  //fetch user from database with id
  getUserById(id: string, role:string): Observable<serverResponse> {
    const url = this.baseUrl + this.userUrl.GET_USER_BY_ID + `?id=${id}&&role=${role}`;

    return this.httpClient.get<serverResponse>(url);
  }

  userLogin(data: any): Observable<serverResponse> {
    const url = this.baseUrl + this.userUrl.USER_LOGIN

    return this.httpClient.post<serverResponse>(url, data);
  }

  userRegister(data: any) {
    const url = this.baseUrl + this.userUrl.REGISTER;

    return this.httpClient.post(url, data);
  }

  profileUpdation(data:object):Observable<serverResponse>{
    const url = this.baseUrl + this.userUrl.PROFILE_COMPLETION

    return this.httpClient.put<serverResponse>(url, data)
  }

  getItemsbyId(data:Object):Observable<serverResponse>{
    const url = this.baseUrl + this.userUrl.GET_ITEMS_BY_ID
    
    return this.httpClient.post<serverResponse>(url, data)
  }

  // post request for initiating payment
  payment(amount:number){
    const url = this.baseUrl + this.userUrl.PAYMENT
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(url, {amount}, {headers})
  }

  paymentVerification(data:object){
    const url = this.baseUrl + this.userUrl.PAYMENT_VERIFY
    return this.httpClient.post(url, data)
  }

  newsSort(data: object[]) {
    const featured = data[data.length - 1];
    let news = [];
    for (let i = 0; i < 2; i++) {
      news.push(data[i]);
    }
    return { featured, news };
  }


  profileForm(data:any){
    if(data === null){
      return this.fb.group({
        Image:[null, [Validators.required]],
        Gender:['', [Validators.required]],
        Age:['', [Validators.required,Validators.pattern('^[0-9]*$')]],
        Height:['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        Weight:['', [Validators.required, Validators.pattern('^[0-9]*$')]]
      })
    }else{
      return this.fb.group({
        Image:[data.Image, [Validators.required]],
        Gender:[data.Gender, [Validators.required]],
        Age:[data.Age, [Validators.required,Validators.pattern('^[0-9]*$')]],
        Height:[data.Height, [Validators.required,Validators.pattern('^[0-9]*$')]],
        Weight:[data.Weight, [Validators.required,Validators.pattern('^[0-9]*$')]]
      })
    }
  }
}
