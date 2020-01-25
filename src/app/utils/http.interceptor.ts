import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { NotifierService } from "angular-notifier";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private notifierService: NotifierService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    next.handle(req).pipe(
      catchError((err: any) => {
        if(err instanceof HttpErrorResponse) {
          let errorMessage = "An error occurred";

          try {
            if (err.status === 500) {
              errorMessage = "We could not fetch the data from de backend application";
            }

            this.notifierService.notify("error", errorMessage);
          } catch(e) {
            this.notifierService.notify("error", errorMessage);
          }
        }

        return err;
      })
    );

    return next.handle(req);
  }

}
