import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../interfaces/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http:HttpClient) { }
  private baseUrl = 'http://localhost:3000'
  registerUser(userDetails:user){
     return this.http.post(`${this.baseUrl}/users`,userDetails);
  }

  getUserBylogin(email:string):Observable<user[]>{
    return this.http.get<user[]>(`${this.baseUrl}/users?email=${email}`)
  }
}
