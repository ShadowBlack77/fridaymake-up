import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, take } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _httpClient: HttpClient = inject(HttpClient);

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

  login() {

  }

  register() {

  }

  logout() {

  }

  profile(): Observable<User> {
    const user: BehaviorSubject<User> = new BehaviorSubject<User>({
      email: 'a@a.com',
      username: 'shadowblack',
      role: 'user'
    });

    return user;
  }

  refreshToken() {

  }
}