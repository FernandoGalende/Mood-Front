import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { UserSuggestions } from '../../user-suggestions';

@Component({
  selector: 'app-new-kudo',
  templateUrl: './new-kudo.component.html',
  styleUrls: ['./new-kudo.component.scss']
})
export class NewKudoComponent implements OnInit {
  @HostBinding('class')
  hostClass = 'new-kudo';
  form: FormGroup;
  loading: boolean;

  constructor(
    private _fb: FormBuilder,
    private _api: ApiService,
    private _router: Router,
    private _toast: ToastService
  ) {
    this.form = this._fb.group({
      users: [[], Validators.required],
      message: ['', [Validators.required, Validators.maxLength(500)]],
      anonymous: false
    });
    this.loading = false;
  }

  ngOnInit() {}

  onUsersAdded(users: UserSuggestions[]): void {
    this.form.controls['users'].setValue(users);
  }

  onSubmit() {
    this.loading = true;
    this._api
      .sendKudos(
        this.form.value.users,
        this.form.value.message,
        this.form.value.anonymous
      )
      .subscribe(
        res => {
          this.loading = false;
          this._toast.setMessage({
            text: 'Thank you, message is sent!',
            level: 'SUCCESS',
            persistent: false
          });
          this._router.navigate(['kudos']);
        },
        err => {
          this.loading = false;
          this._toast.setMessage({
            text: 'There was an error, please try again later :)',
            level: 'DANGER',
            persistent: false
          });
          this._router.navigate(['kudos']);
        }
      );
  }
}
