import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  baseUrl:string = environment.trainer.TRAINER_BASE_URL
  trainerUrl = environment.trainer
  constructor(private httpClient: HttpClient) {}

  //trainer login request
  trainerLogin(data: object): Observable<serverResponse> {
    const url = this.baseUrl + this.trainerUrl.LOGIN;

    return this.httpClient.post<serverResponse>(url, data);
  }

  trainerRegistration(data: object): Observable<serverResponse> {
    const url = this.baseUrl + this.trainerUrl.REGISTRATION;

    return this.httpClient.post<serverResponse>(url, data);
  }

  getAllItems(data: string): Observable<serverResponse> {
    const url = this.baseUrl + this.trainerUrl.GET_ALL_ITEMS + `?item=${data}`;

    return this.httpClient.get<serverResponse>(url);
  }

  getTrainerById(id:string, role:string):Observable<serverResponse>{
    const url = this.baseUrl + this.trainerUrl.GET_TRAINER_BY_ID + `?id=${id}&&role=${role}`;

    return this.httpClient.get<serverResponse>(url)
  }

  updateTrainerData(data: Object): Observable<serverResponse> {
    const url = this.baseUrl + this.trainerUrl.UPDATE_TRAINER

    return this.httpClient.put<serverResponse>(url, data);
  }

  insertNewDiet(data:Object):Observable<serverResponse>{
    const url = this.baseUrl + this.trainerUrl.INSERT_NEW_DIET
    
    return this.httpClient.post<serverResponse>(url, data);
  }

  updateDiet(data:Object):Observable<serverResponse>{
    const url = this.baseUrl + this.trainerUrl.UPDATE_DIET
    
    return this.httpClient.put<serverResponse>(url, data);
  }
}
