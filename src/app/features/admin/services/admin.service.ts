import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}

  // sending post request for admin login
  adminLogin(data: Object) {
    const url = 'http://localhost:3000/admin/login';

    return this.httpClient.post(url, data);
  }

  //post request for get all users from the server
  getAllUsers() {
    const url = 'http://localhost:3000/admin/getitems?item=user';

    return this.httpClient.get(url);
  }

  getAllExercise() {
    const url = 'http://localhost:3000/admin/getitems?item=exercise';

    return this.httpClient.get(url);
  }

  getAllNews() {
    const url = 'http://localhost:3000/admin/getitems?item=news';

    return this.httpClient.get(url);
  }

  insertNews(data:Object){
    const url = 'http://localhost:3000/admin/insertitems'

    return this.httpClient.post(url, data)
  }

  deleteNews(data:object | any){
    const url = `http://localhost:3000/admin/deleteitems?id=${data.id}&&item=${data.item}`;

    return this.httpClient.delete(url, data)
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
        });
      }
    });
    return { keys: keys, items: exerciseArr };
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
    
    return { keys: keys, items: newsArr };
  }
}
