import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })
  constructor() { }

  ngOnInit(): void {

  }
  router = inject(Router);

  signIn() {
    let loginData = this.loginForm.value;
    if (loginData.username == 'Admin' && loginData.password == '12345') {
      this.router.navigateByUrl('/dashboard');
    } else {
      alert('Wrong Credentials');
    }
  }

}
