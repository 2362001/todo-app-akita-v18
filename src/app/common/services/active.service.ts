import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
interface DataResponse<T> {
  code: number;
  message: string;
  status: boolean;
  data: T;
  error?: any;
  count?: number;
}


@Injectable({
  providedIn: 'root'
})
export class ActiveApiService {
  domain = `${environments.domain}/service-activation`;
  constructor(private http: HttpClient) { }

  // getList(id_company: string) {
  //   return this.httpClient.get<DataResponse<any>>(this.createUrl(`${id_company}`), {})
  // }
  // submit(body) {
  //   return this.httpClient.post<DataResponse<any>>(this.createUrl(""), body)
  // }
  approve(body: any) {
    return this.http.post<DataResponse<any>>(`${this.domain}/active`, body)
  }
}
