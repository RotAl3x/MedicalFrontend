import {EventEmitter, Injectable} from '@angular/core';
import {environment} from "../../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {LocalStorage} from "@ngx-pwa/local-storage";
import {IAuthSession, IChangePassword, ILogin, IRegister, IUser} from "../models/login";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token?: string;
  private session?: IAuthSession;
  private authState: EventEmitter<boolean> = new EventEmitter();
  private readonly _baseUrl = environment.apiUrl;


  constructor(private http: HttpClient,
              private storage: LocalStorage,
              private router: Router) {
  }

  public async login(requestModel: Partial<ILogin>): Promise<boolean> {
    const url = this._baseUrl + 'api/auth/login';
    const session = await firstValueFrom(this.http.post<IAuthSession>(url, requestModel));
    await this.saveSession(session);
    return true;
  }

  public async register(data: Partial<IRegister>): Promise<string> {
    const url = this._baseUrl + 'api/auth/register';
    const options = await this.getOptions(true);
    return firstValueFrom(this.http.post<string>(url, data, options));
  }

  public async changePassword(data: Partial<IChangePassword>): Promise<string> {
    const url = this._baseUrl + 'api/auth/changePassword';
    const options = await this.getOptions(true);
    return await firstValueFrom(this.http.post<string>(url, data, options));
  }

  public async delete(id: string): Promise<string> {
    const url = this._baseUrl + `api/auth/deleteAccount/${id}`;
    const options = await this.getOptions(true);
    return await firstValueFrom(this.http.delete<string>(url, options));
  }

  public async saveSession(authSession?: IAuthSession): Promise<void> {
    await firstValueFrom(this.storage.setItem('token', authSession?.token));
    await firstValueFrom(this.storage.setItem('session', authSession));
    await this.loadSession();
  }

  public async deleteSession(): Promise<void> {
    await firstValueFrom(this.storage.clear());
    await this.loadSession();
  }

  public async getOptions(needsAuth?: boolean): Promise<{ headers?: HttpHeaders, responseType: any }> {
    let headers = new HttpHeaders()
    const session = await this.getSession();

    if (session) {
      headers = new HttpHeaders().append('Authorization', `${session.tokenType} ${session.token}`);
    }

    return {headers: headers, responseType: 'text'};
  }

  public async hasRole(role: string): Promise<boolean> {
    const session = await this.getSession();
    return session?.role?.includes(role);
  }

  public async getSession(): Promise<IAuthSession> {
    return this.session ?? (<IAuthSession>await firstValueFrom(this.storage.getItem('session')));
  }

  public async getUsersByRole(role: string): Promise<IUser[]> {
    const url = this._baseUrl + 'api/auth/getAllUsersByRole/' + role;
    return await firstValueFrom(this.http.get<IUser[]>(url));
  }

  public async logout(): Promise<void> {
    await this.deleteSession();
    await this.router.navigate(['login']);
  }

  private async loadSession(): Promise<void> {
    const initialStatus = !!this.token;
    const oldToken = this.token;
    this.token = <string>await firstValueFrom(this.storage.getItem('token'));
    this.session = this.token ? <IAuthSession>await firstValueFrom(this.storage.getItem('session')) : undefined;

    if (initialStatus !== !!this.token || oldToken !== this.token) {
      this.authState.emit(!!this.token);
    }
  }
}
