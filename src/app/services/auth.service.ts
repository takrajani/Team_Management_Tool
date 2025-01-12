import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/loginResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5031/api/Auth/login'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    // // Mock API response
    // const mockResponse = {
    //       user: {
    //     id: 1,
    //     username: credentials.username,
    //     email: 'mockuser@example.com',
    //   },
    // };

    // return new Observable((observer) => {
    //   observer.next(mockResponse);
    //   observer.complete();
    // });

    return this.http.post<LoginResponse>(`${this.apiUrl}`, credentials);
  }
}
