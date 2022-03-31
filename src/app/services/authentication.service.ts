import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private userSource: BehaviorSubject<User | null>;
  user$: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;

    this.userSource = new BehaviorSubject<User | null>(
      this.getUserFromLocalStorage()
    );

    this.user$ = this.userSource.asObservable();
  }

  private getUserFromLocalStorage(): User | null {
    const userStr = localStorage.getItem('user');
    const user = userStr != null ? JSON.parse(userStr) : null;
    return user;
  }

  getUserValue(): User | null {
    return this.userSource.getValue();
  }

  registerNewUser(user: User): Observable<User> {
    return this.http
      .post<{ accessToken: string; user: User }>(
        `${this.apiUrl}/register`,
        user,
        this.httpOptions
      )
      .pipe(
        map((res) => {
          const user = new User();

          if (res?.accessToken) {
            user.token = res.accessToken;
            user.email = res.user.email;
            user.id = res.user.id;
          }

          return user;
        })
      );
  }

  loginUser(
    email: string,
    password: string,
    remember?: boolean
  ): Observable<User> {
    const body = {
      email,
      password,
    };

    return this.http
      .post<{ accessToken: string; user: User }>(
        `${this.apiUrl}/login`,
        body,
        this.httpOptions
      )
      .pipe(
        map((res) => {
          const user = new User();

          if (res?.accessToken) {
            user.token = res.accessToken;
            user.email = res.user.email;
            user.id = res.user.id;
            this.userSource.next(user);
            console.log(user);
          }

          return user;
        }),

        tap((user) => {
          if (remember) localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }
}
