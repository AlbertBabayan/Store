import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {IAuth} from '../infrastructure/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);


  public login(payload: Pick<IAuth,'email' | 'password'>): Observable<void> {
    const url = 'https://api.escuelajs.co/api/v1/auth/login';
    return this.http.post<void>(url, payload)
  }

  public create(payload: IAuth): Observable<unknown> {
    const url = 'https://api.escuelajs.co/api/v1/users/';
    return this.http.post<unknown>(url, payload).pipe(
      tap(res => {
        // localStorage.setItem('token', res);
        console.log(res);
      })
    )
  }
}
