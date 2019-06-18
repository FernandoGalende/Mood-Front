import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth0Token } from '../interfaces/auth0-token.ts';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @HostBinding('class')
  hostClass = 'login';
  form: FormGroup;
  err: string;

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private _api: ApiService
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.err = '';
  }

  ngOnInit() {
    if (this._auth.isAuthenticated()) {
      this._router.navigate(['']);
    }
  }

  onSubmit() {
    this._auth.login(this.form.value.email, this.form.value.password).subscribe(
      (res: Auth0Token) => {
        this._router.navigate(['']);
        this._api.userExists(this.form.value.email).subscribe();
      },
      e => {
        this.err = /\[[0-9]+\]/.test(e.status)
          ? 'The username and password you entered did not match our records.'
          : 'Something went wrong on our end.';
      }
    );
  }
}
