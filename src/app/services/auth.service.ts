import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {IAuth} from '../infrastructure/interfaces/auth.interface';
import {ICreatedUser} from '../infrastructure/interfaces/created-user.interface';
import {IUserToken} from '../infrastructure/interfaces/user-token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);


  public login(payload: Pick<IAuth,'email' | 'password'>): Observable<IUserToken> {
    const url = 'https://api.escuelajs.co/api/v1/auth/login';
    return this.http.post<IUserToken>(url, payload);
  }

  public create(payload: IAuth): Observable<ICreatedUser> {
    const url = 'https://api.escuelajs.co/api/v1/users/';
    return this.http.post<ICreatedUser>(url, payload);
  }
}
