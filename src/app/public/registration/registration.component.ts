import {Component, DestroyRef, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  public createForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    photoUrl: ['https://picsum.photos/800', [Validators.required]],
  })

  public create() {
    this.authService.create({
      name: this.createForm.controls.name.value,
      email: this.createForm.controls.email.value,
      password: this.createForm.controls.password.value,
      avatar: this.createForm.controls.photoUrl.value,
    }).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }

  public navToLogIn() {
    this.router.navigate(['login']);
  }
}
