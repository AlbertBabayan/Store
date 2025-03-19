import {Component, DestroyRef, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatLabel, MatInput, MatFormField, MatButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  public loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })

  public login() {
    this.authService.login(this.loginForm.getRawValue()).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  public navToRegister() {
    this.router.navigate(['register']);
  }
}
