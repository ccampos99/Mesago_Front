import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    // Verificar si hay un usuario en localStorage al iniciar
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(username: string, password: string): Observable<any> {
    // Simulación de login - reemplazar con llamada real a API
    return of({
      id: 1,
      username: username,
      firstName: username,
      lastName: '',
      roles: [username.toLowerCase().includes('chef') ? 'CHEF' : 'MESERO'],
      token: 'fake-jwt-token'
    }).pipe(
      delay(1500), // Simular retraso de red
      tap(user => {
        // Almacenar detalles del usuario en localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  logout() {
    // Eliminar usuario del localStorage al cerrar sesión
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }
}
