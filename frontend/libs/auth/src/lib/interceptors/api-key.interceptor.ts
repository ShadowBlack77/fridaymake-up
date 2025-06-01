import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENVIRONMENTS_TOKEN, EnvironmentsConfig } from "@lib/core/environments";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiKeyInterceptors implements HttpInterceptor {

  private readonly _env: EnvironmentsConfig = inject(ENVIRONMENTS_TOKEN);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const modifiedReq = req.clone({
      setHeaders: {
        'x-api-key': this._env.apiKey
      }
    });

    return next.handle(modifiedReq);
  }
}