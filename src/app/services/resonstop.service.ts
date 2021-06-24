import { ResonStopModel } from './../models/resonStopModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ResonstopService {

  apiUrl="https://localhost:44384/api/resonstops/";
  constructor(private httpClient:HttpClient) { }


  getAll():Observable<ListResponseModel<ResonStopModel>>{

    let newUrl=this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<ResonStopModel>>(newUrl);

  }

}
