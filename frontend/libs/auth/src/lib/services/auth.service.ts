import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, switchMap, take, tap } from "rxjs";
import { User } from "../models/user.model";
import { Login } from "../models/login.model";
import { ENVIRONMENTS_TOKEN, EnvironmentsConfig } from "@lib/core/environments";
import { Register } from "../models/register.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _env: EnvironmentsConfig = inject(ENVIRONMENTS_TOKEN);

  readonly user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  init(): Observable<void> {
    return new Observable((observer) => {

      this.profile().pipe(
        take(1)
      ).subscribe({
        next: (user) => {
          this.user$.next(user);

          observer.next();
          observer.complete();
        },
        error: () => {
          this.user$.next(null);

          observer.next();
          observer.complete();
        }
      })
    })
  }

  login(login: Login): Observable<unknown> {
    return this._httpClient.post(`${this._env.apiUrl}/auth/login`, login, { withCredentials: true }).pipe(
      switchMap(() => {
        return this.profile().pipe(
          take(1),
          map((user) => {
            this.user$.next(user);
          })
        )
      })
    );
  }

  register(register: Register): Observable<unknown> {
    return this._httpClient.post(`${this._env.apiUrl}/auth/register`, register);
  }

  logout() {
    return this._httpClient.post(`${this._env.apiUrl}/auth/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.user$.next(null);
      })
    );
  }

  resetPassword(email: string): Observable<unknown> {
    return this._httpClient.post(`${this._env.apiUrl}/auth/reset-password`, email);
  }

  profile(): Observable<User> {
    return this._httpClient.get<User>(`${this._env.apiUrl}/auth/profile`, { withCredentials: true });
  }

  refreshToken(): Observable<unknown> {
    return this._httpClient.post<unknown>(`${this._env.apiUrl}/auth/refresh`, {}, { withCredentials: true });
  }
}