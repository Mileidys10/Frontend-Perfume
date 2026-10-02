import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expired or invalid — clean session and redirect to login
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          localStorage.removeItem('cart');
          this.router.navigate(['/login']);
        } else if (error.status === 403) {
          // User does not have permission — redirect to their default page
          const userData = localStorage.getItem('userData');
          if (userData) {
            const user = JSON.parse(userData);
            const role = user.role;
            if (role === 'ADMIN') {
              this.router.navigate(['/admin']);
            } else if (role === 'VENDEDOR') {
              this.router.navigate(['/seller']);
            } else {
              this.router.navigate(['/home']);
            }
          } else {
            this.router.navigate(['/login']);
          }
        }
        // All other errors pass through for component-level handling
        return throwError(() => error);
      })
    );
  }
}
