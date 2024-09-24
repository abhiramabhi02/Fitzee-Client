import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  getItems(data:string):Observable<serverResponse>{
    const url = `http://localhost:3000/getitems?item=${data}`

    return this.httpClient.get<serverResponse>(url)
  }

  userLogin(data:any):Observable<serverResponse>{
    const url = `http://localhost:3000/login`

    return this.httpClient.post<serverResponse>(url, data)
  }

  userRegister(data:any){
    const url = `http://localhost:3000/register`

    return this.httpClient.post(url, data)
  }

  newsSort(data:object[]){
    const featured = data[data.length-1]
    let news = []
    for(let i = 0; i < 2;i++){
      news.push(data[i])
    }
    return {featured, news}
  }
}
