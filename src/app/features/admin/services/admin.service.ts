import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { toNamespacedPath } from 'path';
import { Observable } from 'rxjs';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';
import { noSpacesValidator } from 'src/app/shared/validators/custom-validators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl: string = environment.admin.ADMIN_BASE_URL;
  adminUrl = environment.admin;
  constructor(private httpClient: HttpClient, private fb: FormBuilder) {}

  // sending post request for admin login
  adminLogin(data: Object): Observable<serverResponse> {
    const url = this.baseUrl + this.adminUrl.LOGIN;

    return this.httpClient.post<serverResponse>(url, data);
  }

  // get request to fetch all the documents of particular items
  getAllItems(data: string): Observable<serverResponse> {
    const url = this.baseUrl + this.adminUrl.GET_ALL_ITEMS + `?item=${data}`;

    return this.httpClient.get<serverResponse>(url);
  }

  getPaymentData(): Observable<serverResponse> {
    const url = this.baseUrl + this.adminUrl.GET_PAYMENTS;
    return this.httpClient.get<serverResponse>(url);
  }

  insertItems(data: Object): Observable<serverResponse> {
    const url = this.baseUrl + this.adminUrl.INSERT_ITEMS;

    return this.httpClient.post<serverResponse>(url, data);
  }

  editItems(data: object | any): Observable<serverResponse> {
    const url = this.baseUrl + this.adminUrl.EDIT_ITEMS;

    return this.httpClient.put<serverResponse>(url, data);
  }

  deleteItems(data: object | any) {
    const url =
      this.baseUrl +
      this.adminUrl.DELETE_ITEMS +
      `?id=${data.id}&&item=${data.item}`;

    return this.httpClient.delete(url, data);
  }

  getDashboardData(): Observable<serverResponse> {
    const url = this.baseUrl + this.adminUrl.GET_DASHBOARD;

    return this.httpClient.get<serverResponse>(url);
  }

  createSubscriptionForm(data: string | any) {
    if (data === 'new') {
      return this.fb.group({
        name: ['', [Validators.required, noSpacesValidator()]],
        features: [[], [Validators.required]],
        price: ['', [Validators.required]],
      });
    } else {
      return this.fb.group({
        name: [data.Name, [Validators.required, noSpacesValidator()]],
        features: [[], [Validators.required]],
        price: [data.Price, [Validators.required]],
      });
    }
  }

  usersSorting(data: any) {
    let keys = Object.keys(data.items[0]);
    keys = keys.filter(
      (key) =>
        ![
          'Password',
          'Subscription',
          '__v',
          '_id',
          'PersonalDetails',
          'Package',
          'JoinedDate',
        ].includes(key)
    );
    let userArr: Object[] = [];
    data.items.forEach((items: any) => {
      if (items.Name && items.Email) {
        userArr.push({
          id: items._id,
          Name: items.Name,
          Email: items.Email,
          Verification: items.Verification,
          Payment: items.Payment,
          JoinedDate: items.JoinedDate,
        });
      }
    });
    return { keys: keys, items: userArr };
  }

  exerciseSorting(data: any) {
    let keys = Object.keys(data.items[0]).slice(0, -1);
    keys = keys.filter(
      (key) =>
        ![
          '_id',
          'Image',
          '__v',
          'InsertedDate',
          'LastUpdate',
          'Sets',
          'Reps',
        ].includes(key)
    );
    let exerciseArr: Object[] = [];
    data.items.forEach((items: any) => {
      if (items.Name && items.Description) {
        exerciseArr.push({
          id: items._id,
          Name: items.Name,
          Description: items.Description,
          Image: items.Image,
          Status: items.Status,
          InsertedDate: items.InsertedDate,
          LastUpdate: items.LastUpdate,
        });
      }
    });
    return { keys: keys, items: exerciseArr };
  }

  subscriptionSorting(data: any) {
    let keys = Object.keys(data.items[0]);
    keys = keys.filter(
      (key) => !['__v', '_id', 'InsertedDate', 'LastUpdate'].includes(key)
    );
    let subscriptionArr: Object[] = [];
    data.items.forEach((items: any) => {
      if (items.Name) {
        subscriptionArr.push({
          id: items._id,
          Name: items.Name,
          Features: items.Features,
          Price: items.Price,
          Status: items.Status,
          InsertedDate: items.InsertedDate,
          LastUpdate: items.LastUpdate,
        });
      }
    });
    return { keys: keys, items: subscriptionArr };
  }

  newsSorting(data: any) {
    let keys = Object.keys(data.items[0]).slice(1, -2);
    keys = keys.filter(
      (key) =>
        !['__v', '_id', 'Image', 'InsertedDate', 'LastUpdate'].includes(key)
    );
    let newsArr: Object[] = [];
    data.items.forEach((items: any) => {
      if (items.Title && items.Description) {
        newsArr.push({
          id: items._id,
          Title: items.Title,
          Description: items.Description,
          Image: items.Image,
          Status: items.Status,
          InsertedDate: items.InsertedDate,
          LastUpdate: items.LastUpdate,
        });
      }
    });
    console.log(newsArr);

    return { keys: keys, items: newsArr };
  }

  packageSorting(data: any) {
    let keys = Object.keys(data.items[0]).slice(1, -3);
    keys = keys.filter(
      (key) =>
        ![
          '__v',
          '_id',
          'InsertedDate',
          'LastUpdate',
          'Subscription',
          'Exercises',
        ].includes(key)
    );
    let newsArr: Object[] = [];
    data.items.forEach((items: any) => {
      if (items.Packagename && items.Description) {
        newsArr.push({
          id: items._id,
          Packagename: items.Packagename,
          Description: items.Description,
          Exercises: items.Exercises,
          Subscription: items.Subscription,
          Status: items.Status,
          InsertedDate: items.InsertedDate,
          LastUpdate: items.LastUpdate,
        });
      }
    });

    return { keys: keys, items: newsArr };
  }

  trainerSorting(data: any) {
    console.log(data, 'data 23');

    let keys = Object.keys(data[0]);
    keys = keys.filter(
      (key) => !['_id', 'Password', '__v', 'Image', 'JoinedDate'].includes(key)
    );
    console.log(keys, 'key');
    let trainerArr: Object[] = [];
    data.forEach((items: any) => {
      if (items.Name && items.Email) {
        trainerArr.push({
          id: items._id,
          Name: items.Name,
          Email: items.Email,
          Verification: items.Verification,
          Image: items.Image,
          JoinedDate: items.JoinedDate,
        });
      }
    });
    return { keys: keys, items: trainerArr };
  }

  reportSorting(data: any) {
    console.log(data, 'repo');

    let keys: string[] = [
      'User',
      'Email',
      'Package',
      'Subscription',
      'Age',
      'Gender',
      'Amount',
    ];

    let paymentReport: object[] = [];
    data.forEach((item: any) => {
      if (item.Name) {
        paymentReport.push({
          User: item.Name,
          Email: item.Email,
          Package: item.Package?.Packagename,
          Subscription: item.Subscription.Name,
          Age: item?.PersonalDetails?.Age || 'nil',
          Gender: item?.PersonalDetails?.Gender || 'nil',
          Amount: item.Subscription.Price,
        });
      }
    });
    console.log(paymentReport, 're');
    return { keys: keys, items: paymentReport };
  }
}
