import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../../core/services/auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="logo-container">
          <img src="/assets/images/logo-mesago.png" alt="MesaGo!" class="logo">
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="username">Usuario:</label>
            <input
              type="text"
              id="username"
              formControlName="username"
              class="form-control"
              [ngClass]="{'is-invalid': submitted && f['username'].errors}"
            >
            <div *ngIf="submitted && f['username'].errors" class="invalid-feedback">
              <div *ngIf="f['username'].errors['required']">El usuario es requerido</div>
            </div>
          </div>

          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input
              [type]="showPassword ? 'text' : 'password'"
              id="password"
              formControlName="password"
              class="form-control"
              [ngClass]="{'is-invalid': submitted && f['password'].errors}"
            >
           <div *ngIf="submitted && f['password'].errors" class="invalid-feedback">
             <div *ngIf="f['password'].errors['required']">La contraseña es requerida</div>
           </div>
          </div>

          <button
            type="submit"
            class="login-button"
            [disabled]="loading"
          >
            <span *ngIf="!loading">INGRESAR</span>
            <div *ngIf="loading" class="spinner"></div>
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #FFD580 0%, #E6F0FF 100%);
      padding: 20px;
    }

    .login-card {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 450px;
      padding: 40px;
    }

    .logo-container {
      display: flex;
      justify-content: center;
      margin-bottom: 40px;
    }

    .logo {
      width: 180px;
      height: auto;
    }

    .login-form {
      display: flex;
      flex-direction: column;
    }

    .form-group {
      margin-bottom: 24px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: 500;
      color: #2962FF;
    }

    .form-control {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #D0D0D0;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.2s;
    }

    .form-control:focus {
      outline: none;
      border-color: #2962FF;
      box-shadow: 0 0 0 2px rgba(41, 98, 255, 0.2);
    }

    .form-control.is-invalid {
      border-color: #FF3D00;
    }

    .invalid-feedback {
      color: #FF3D00;
      font-size: 14px;
      margin-top: 4px;
    }

    .login-button {
      background-color: #2962FF;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 14px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      margin-top: 16px;
    }

    .login-button:hover {
      background-color: #0D47A1;
    }

    .login-button:disabled {
      background-color: #90CAF9;
      cursor: not-allowed;
    }

    .spinner {
      width: 24px;
      height: 24px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    this.loading = true;

    setTimeout(() => {
      const username = this.f['username'].value;
      const role = username.toLowerCase().includes("chef")
        ? "CHEF"
        : username.toLowerCase().includes("mesero")
          ? "MESERO"
          : "ADMIN";

      const user = {
        id: 1,
        username,
        firstName: username,
        lastName: "",
        roles: [role],
        token: "fake-jwt-token",
      };

      localStorage.setItem("currentUser", JSON.stringify(user));

      this.router.navigate([`/${role.toLowerCase()}/dashboard`]);
      this.loading = false;
    }, 1500);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
