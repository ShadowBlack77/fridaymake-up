import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _httpClient: HttpClient = inject(HttpClient);

  readonly user$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  init(): Observable<void> {
    return new Observable((observer) => {
      observer.next();
      observer.complete();
    })
  }

  login() {

  }

  register() {

  }

  logout() {

  }

  profile() {

  }

  refreshToken() {

  }
}