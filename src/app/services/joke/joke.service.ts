import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JokeModel } from 'src/app/models/joke-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JokeService {

  constructor(private http: HttpClient) { }

  getJoke() {
    const url = `${environment.apiUrl}/jokes/random`;
    return this.http.get<JokeModel>(url);
  }
}
