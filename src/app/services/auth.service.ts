import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Configuration } from '../open-api/strava';

interface Token {
    token_type: string,
    expires_at: number,
    expires_in: number,
    refresh_token: string,
    access_token: string,
    athlete: object
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://www.strava.com'
  private httpClient: HttpClient = inject(HttpClient)
  private router = inject(Router)

  private localStorageToken = window.localStorage.getItem('token')
  public token = signal<Token|null>(this.localStorageToken !== null ? JSON.parse(this.localStorageToken) as Token : null)
  public config!: Configuration

  public async init(): Promise<void> {
    const url = new URL(window.location.href)
    const params = url.searchParams
    const code = params.get('code')
    const token = this.token()
    if(token && token.expires_at < new Date().getTime() / 1000) {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('activities')
      this.token.set(null)
    }
    if(!this.token() && !code) {
      this.authorize()
    }

    if(code) {
      const token = await firstValueFrom(this.setToken(code))
      this.token.set(token)
      window.localStorage.setItem('token', JSON.stringify(token))
    }
    this.config = new Configuration({
      basePath: `${this.baseUrl}/api/v3`,
      credentials: { strava_oauth: this.token()?.access_token || '' }}
    )
    if(code) {
      this.router.navigateByUrl('/')
    }
  }

  authorize() {
    window.location.assign(`${this.baseUrl}/oauth/authorize?redirect_uri=${window.location.origin}&client_id=143851&scope=read_all,activity:read_all,profile:read_all&response_type=code`)
  }

  setToken(code: string) {
    return this.httpClient.post<Token>(this.baseUrl + '/oauth/token', {
        client_id: "143851",
        client_secret: 'f11d8684e70d729d439cb6a9a1ae77128f176320',
        scope: 'read_all,activity:read_all,profile:read_all',
        grant_type: 'authorization_code',
        code
    })
  }


}
