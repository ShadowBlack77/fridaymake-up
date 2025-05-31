import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, catchError, concatMap, filter, finalize, Observable, take, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RefreshInterceptors implements HttpInterceptor {

  private readonly _authService: AuthService = inject(AuthService);
  private readonly _isRefreshing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes('login') || req.url.includes('register')) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 403 && err.error.message === 'Invalid token') {
          return this.handle403Error(req, next);
        }

        return throwError(err);
      })
    )
  }

  private handle403Error(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this._isRefreshing.getValue()) {
      this._isRefreshing.next(true);

      return this._authService.refreshToken().pipe(
        concatMap(() => {
          return next.handle(req);
        }),
        finalize(() => this._isRefreshing.next(false))
      )
    };


    return this._isRefreshing.asObservable().pipe(
      filter((isRefreshing: boolean) => !isRefreshing),
      take(1),
      concatMap(() => next.handle(req))
    )
  }
}