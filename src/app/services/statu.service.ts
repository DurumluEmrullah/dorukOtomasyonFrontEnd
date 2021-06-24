import { ResponseModel } from './../models/responseModel';
import { StatuModel } from './../models/statuModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class StatuService {

  apiUrl="https://localhost:44384/api/status/"
  constructor(private httpClient : HttpClient) { }

  getAll():Observable<ListResponseModel<StatuModel>>{
    let newUrl = this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<StatuModel>>(newUrl);
  }
  add(statuModel:StatuModel):Observable<ResponseModel>{
    let newUrl=this.apiUrl+"add";
    console.log(newUrl)
    return this.httpClient.post<ResponseModel>(newUrl,statuModel);
  }
}
