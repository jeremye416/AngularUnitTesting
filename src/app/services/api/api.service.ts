import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserRequest, CreateUserResponse } from 'src/app/models/create-user';
import { RegisterRequest, RegisterResponse } from 'src/app/models/register';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient) { }

  createUser(request: CreateUserRequest) {
    const url = `${environment.reqres}/api/users`;
    return this.http.post<CreateUserResponse>(url, request);
  }

  register(request: RegisterRequest) {
    const url = `${environment.reqres}/api/register`;
    return this.http.post<RegisterResponse>(url, request);
  }
}
