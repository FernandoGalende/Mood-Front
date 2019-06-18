import {
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Thought } from '../interfaces/thought';
import { ApiService } from '../services/api.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {
  @HostBinding('class')
  hostClass = 'suggestions';
  @ViewChild('message')
  inputValue: ElementRef;
  form: FormGroup;
  loading: boolean;

  constructor(
    private _api: ApiService,
    private _fb: FormBuilder,
    private _router: Router,
    private _toast: ToastService
  ) {}

  ngOnInit() {
    this.form = this._fb.group({
      message: ['', [Validators.required, Validators.maxLength(500)]],
      anonymous: [false]
    });
  }

  onSubmit() {
    this.loading = true;
    this._api
      .sendSuggestions(this.form.value.message, this.form.value.anonymous)
      .subscribe(
        (res: any) => this.handleResponse(res.item.Item),
        err => this.handleError(),
        () => this.cleanForm()
      );
  }

  cleanForm() {
    this.loading = false;
    this.inputValue.nativeElement.value = '';
    this.form.controls['message'].setValue('');
    this.form.controls['anonymous'].setValue(false);
  }

  handleResponse(suggestion: Thought): void {
    const { isAnonymous, id } = suggestion;
    if (isAnonymous) {
      this._toast.setMessage({
        text: `Thank you, message is sent, here is your private link: ${
          environment.url
        }/${id}`,
        level: 'WARN',
        persistent: true
      });
    } else {
      this._toast.setMessage({
        text: 'Thank you, message is sent!',
        level: 'SUCCESS',
        persistent: false
      });
    }
    this._router.navigate(['suggestions']);
  }

  handleError() {
    this._toast.setMessage({
      text: 'There was an error, please try again later :)',
      level: 'DANGER',
      persistent: false
    });
    this._router.navigate(['suggestions']);
  }
}
