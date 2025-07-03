import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, BehaviorSubject } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, UserCredential, User } from 'firebase/auth';
import { environment } from '../../enviroments/enviroment';
import { ClientServiceModel } from '../shared/models/response/client-service.model';
import { ClientInfoResponse, ClientLoginRequest, ClientRegisterRequest, ClientRegisterResponse } from '../data/client.data';
import { isPlatformBrowser } from '@angular/common';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = environment.apiUrl;
  private auth: any;
  private currentUserSubject = new BehaviorSubject<ClientServiceModel | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) {
    const firebaseConfig = {
      apiKey: environment.firebase.apiKey,
      authDomain: environment.firebase.authDomain,
      projectId: environment.firebase.projectId,
    };
    
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);

    this.checkAuthState();
  }

  registerClient(clientData: ClientRegisterRequest): Observable<ClientRegisterResponse> {
    return this.http.post<ClientRegisterResponse>(`${this.apiUrl}/client/register`, clientData);
  }

  loginClient(clientLoginRequest: ClientLoginRequest): Observable<ClientServiceModel> {
    return from(
      signInWithEmailAndPassword(this.auth, clientLoginRequest.email, clientLoginRequest.password)
        .then(async (userCredential: UserCredential) => {
          const idToken = await userCredential.user.getIdToken();
          const userData: ClientServiceModel = {
            displayName: userCredential.user.displayName || '',
            uid: userCredential.user.uid,
            email: userCredential.user.email || '',
            localId: userCredential.user.uid,
            refreshToken: userCredential.user.refreshToken,
            idToken,
            expiresIn: '3600'
          };
          console.log(userData)
          this.saveUserData(userData);
          return userData;
        })
    );
  }

  private saveUserData(userData: ClientServiceModel): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(userData));
    }
    this.currentUserSubject.next(userData);
  }

  private checkAuthState(): void {
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        user.getIdToken().then((idToken) => {
          const userData: ClientServiceModel = {
            displayName: user.displayName || '',
            uid: user.uid,
            email: user.email || '',
            localId: user.uid,
            refreshToken: user.refreshToken,
            idToken,
            expiresIn: '3600',
          };
          this.saveUserData(userData);
        });
      } else {
        this.clearUserData();
      }
    });
  }

  clientSignOut(): void {
    signOut(this.auth).then(() => {
      this.clearUserData();
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  }

  private clearUserData(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): ClientServiceModel | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    const user = this.getCurrentUser();
    return user ? user.idToken : null;
  }

  canActivate(): boolean {
    if (this.getToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  clientStatus(): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      onAuthStateChanged(this.auth, (user) => {
        subscriber.next(!!user);
        subscriber.complete();
      });
    });
  }

  getClient(): Observable<ClientInfoResponse> {
    const token = this.auth;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ClientInfoResponse>(`${this.apiUrl}/client/find`, { headers });
  }
}