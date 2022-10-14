import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: User; 

  constructor( private http: HttpClient ) { }

  get user() {
    console.log(this._user)
    return { ...this._user}
  }

  register( name: string, email: string, password: string ) {
    const url = `${this.baseUrl}/auth/new`;

    return this.http.post<AuthResponse>(url, {name, email, password})
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token!)
        }),
        map(res => res.ok),
        catchError(err => {
          return of(err.error.msg)
        })
      )
  }

  

  login( email: string, password: string ) {

    const url = `${ this.baseUrl }/auth`;
    const body = {
      email,
      password
    }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap( res => {
          console.log(res.email)
          localStorage.setItem('token', res.token!)
        }),
        map( res => res.ok ),
        catchError( err => of(err.error.msg))
      )
  }

  verifyToken(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    return this.http.get<AuthResponse>( url, {headers} )
      .pipe(
        map(res => {
          localStorage.setItem('token', res.token!)
            this._user = {
              name: res.name!,
              uid: res.uid!,
              email: res.email!
            }
          return res.ok
        }),
        catchError(err => of(false))
      )

  }

  logout () {
    localStorage.removeItem('token');
  }

}
