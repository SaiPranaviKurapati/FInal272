import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private baseUrl: string = 'http://127.0.0.1:5000'; // Set your base URL here

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const user = { username, password };
    const loginUrl = `${this.baseUrl}/api/login`; // Create the full URL
    return this.http.post(loginUrl, user);
  }

  logout(){
    sessionStorage.clear();
  }
}


