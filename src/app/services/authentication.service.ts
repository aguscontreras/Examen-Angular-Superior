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

  private getUserFromLocalStorage(): User {
    const userStr = localStorage.getItem('user');
    const user = userStr != null ? JSON.parse(userStr) : null;
    return user;
  }

  getUserValue(): User | null {
    return this.userSource.getValue();
  }

  registerNewUser(user: Partial<User>): Observable<User> {
    return this.http
      .post<{ accessToken: string; user: User }>(
        `${this.apiUrl}/register`,
        user,
        this.httpOptions
      )
      .pipe(
        map((res) => {
          let user = new User();

          if (res?.accessToken) {
            user = { ...res.user, token: res.user.token };
            setTimeout(() => {
              this.userSource.next(user);
            }, 4000);
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
          let user = new User();

          if (res?.accessToken) {
            user = { ...res.user, token: res.user.token };
            this.userSource.next(user);
          }

          return user;
        }),

        tap((user) => {
          if (remember) localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSource.next(null);
  }
}
