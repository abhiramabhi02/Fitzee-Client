import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';
import { noSpacesValidator } from 'src/app/shared/validators/custom-validators';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpClient: HttpClient, private fb:FormBuilder) {}

  // sending post request for admin login
  adminLogin(data: Object): Observable<serverResponse> {
    const url = 'http://localhost:3000/admin/login';

    return this.httpClient.post<serverResponse>(url, data);
  }

  //trainer login request
  trainerLogin(data:object):Observable<serverResponse>{
    const url = 'http://localhost:3000/trainer/login'

    return this.httpClient.post<serverResponse>(url, data)
  }

// get request to fetch all the documents of particular items
  getAllItems(data:string): Observable<serverResponse>{
    const url = `http://localhost:3000/admin/getitems?item=${data}`
    
    return this.httpClient.get<serverResponse>(url);
  }

  // get request to fetch all packages as there are some crucial operaion 
  // which cannot be fetched with normal services
  // getAllPackages(data:string){
  //   const url = `http://localhost:3000/admin/getpackages`
    
  //   return this.httpClient.get(url);
  // }

  insertItems(data:Object): Observable<serverResponse>{
    const url = 'http://localhost:3000/admin/insertitems'

    return this.httpClient.post<serverResponse>(url, data)
  }

  editItems(data:object | any): Observable<serverResponse>{
    const url = `http://localhost:3000/admin/updateitems`;

    return this.httpClient.put<serverResponse>(url, data)
  }

  deleteItems(data:object | any){
    const url = `http://localhost:3000/admin/deleteitems?id=${data.id}&&item=${data.item}`;

    return this.httpClient.delete(url, data)
  }

  
  createSubscriptionForm(data:string | any){
    if(data === 'new'){
      return this.fb.group({
        name:['', [Validators.required, noSpacesValidator()]],
        features:[[], [Validators.required]],
        price:['', [Validators.required]]
      })
    }else{
      return this.fb.group({
        name:[data.Name, [Validators.required, noSpacesValidator()]],
        features:[[], [Validators.required]],
        price:[data.Price, [Validators.required]]
      })
    }
  }

  usersSorting(data: any) {
    let keys = Object.keys(data.items[0]).slice(1, -4);
    let userArr: Object[] = [];
    data.items.forEach((items: any) => {
      if (items.Name && items.Email) {
        userArr.push({
          id:items._id,
          Name: items.Name,
          Email: items.Email,
        });
      }
    });
    return { keys: keys, items: userArr };
  }

  exerciseSorting(data: any) {
    let keys = Object.keys(data.items[0]).slice(1, -2);
    let exerciseArr: Object[] = [];
    data.items.forEach((items: any) => {
      if (items.Name && items.Description) {
        exerciseArr.push({
          id:items._id,
          Name: items.Name,
          Description: items.Description,
          Image:items.Image
        });
      }
    });
    return { keys: keys, items: exerciseArr };
  }

  subscriptionSorting(data: any) {
    let keys = Object.keys(data.items[0]).slice(1, -1);
    let subscriptionArr: Object[] = [];
    data.items.forEach((items: any) => {
      if (items.Name) {
        subscriptionArr.push({
          id:items._id,
          Name: items.Name,
          Features: items.Features,
          Price:items.Price
        });
      }
    });    
    return { keys: keys, items: subscriptionArr };
  }

  newsSorting(data: any) {
    let keys = Object.keys(data.items[0]).slice(1, -2);
    let newsArr: Object[] = [];
    data.items.forEach((items: any) => {
      if (items.Title && items.Description) {
        newsArr.push({
          id:items._id,
          Title: items.Title,
          Description: items.Description,
          Image:items.Image
        });
      }
    });
    console.log(newsArr);
    
    
    return { keys: keys, items: newsArr };
  }

  packageSorting(data: any) {
    let keys = Object.keys(data.items[0]).slice(1, -3);
    let newsArr: Object[] = [];
    data.items.forEach((items: any) => {
      if (items.Packagename && items.Description) {
        newsArr.push({
          id:items._id,
          Packagename: items.Packagename,
          Description: items.Description,
          Exercises:items.Exercises,
          Subscription:items.Subscription
        });
      }      
    });
    
    return { keys: keys, items: newsArr };
  }
}
