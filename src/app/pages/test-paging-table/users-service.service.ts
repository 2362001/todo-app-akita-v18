import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface SortingInterface {
  column: string;
  order: 'asc' | 'desc';
}
export interface UserInterface {
  id: string;
  name: string;
  age: number;
}

@Injectable({
  providedIn: 'root'
})

export class UsersServiceService {
  constructor(private http: HttpClient) {}

  getUsers(
    sorting: SortingInterface,
    searchValue: string
  ): Observable<UserInterface[]> {
    // const url = `http://localhost:3004/users?_sort=${sorting.column}&_order=${sorting.order}&name_like=${searchValue}`;
    // const url = `https://6774fa0792222241481a5695.mockapi.io/api/v1/users/_sort=${sorting.column}&_order=${sorting.order}&name_like=${searchValue}`;
    const url = `https://6774fa0792222241481a5695.mockapi.io/api/v1/users/`;
    return this.http.get<UserInterface[]>(url);
  }
}
 