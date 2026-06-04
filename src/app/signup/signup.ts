import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SignupStore } from '../../store/signup/signup.store';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {
  signupForm!: FormGroup;
  private signupStore = inject(SignupStore);

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit(): void {
    this.signupStore.signup({
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    });
  }
}
