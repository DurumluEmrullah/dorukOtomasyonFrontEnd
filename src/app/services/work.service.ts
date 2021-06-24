import { WorkModel } from './../models/workModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  apiUrl="https://localhost:44384/api/works/";
  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<WorkModel>>{
    let newUrl=this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<WorkModel>>(newUrl);
  }
}
