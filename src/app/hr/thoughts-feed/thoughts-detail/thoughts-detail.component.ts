import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Thought } from '../../../interfaces/thought';
import { User } from '../../../interfaces/user';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-thoughts-detail',
  templateUrl: './thoughts-detail.component.html',
  styleUrls: ['./thoughts-detail.component.scss']
})
export class ThoughtsDetailComponent implements OnInit {
  @HostBinding('class')
  hostClass = 'thought-detail-container';

  @ViewChild('message')
  textarea: ElementRef;

  // Tells us if we are viewing conversation from an anonymous view, or an HR one
  @Input()
  anonymous: boolean;

  @Input()
  isHrView: boolean;

  _thought: Thought;

  @Output()
  handleDelete: EventEmitter<void>;
  @Input()
  get thought(): Thought {
    return this._thought;
  }
  set thought(value: Thought) {
    this._thought = value;
    this._userS.getUser(this._thought.user).subscribe(data => {
      this.user = data;
    });
    this.showResponse = false;
  }

  form: FormGroup;
  user: User;
  showResponse: boolean;
  loading: boolean;
  hrUser: User;

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if (!this._ref.nativeElement.contains(event.target)) {
      this.showResponse = false;
    }
  }
  constructor(
    private _fb: FormBuilder,
    private _userS: UserService,
    private _ref: ElementRef,
    private _api: ApiService,
    private _router: Router,
    private _toast: ToastService,
    private _auth: AuthService
  ) {
    this.showResponse = false;
    this.form = _fb.group({
      message: ['', Validators.required]
    });
    this.anonymous = false;
    this.loading = false;
    this.handleDelete = new EventEmitter<void>();
  }

  ngOnInit() {
    this._userS.getUser('hr').subscribe(data => (this.hrUser = data));
    this._userS
      .getUser(this._thought.user)
      .subscribe(data => (this.user = data));
  }

  getUserPicture(msg) {
    return msg.user === 'hr' ? this.hrUser.picture : this.user.picture;
  }

  onSubmit() {
    this.loading = true;
    this._api
      .sendModifiedSuggestion(this.modifyConversation(this._thought))
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cleanUpForm();
          window.scroll(0, 0);
          this._router.navigate([this._router.url]);
        })
      )
      .subscribe(
        res => this.handleResponse('Thank you, message is sent!'),
        err => {
          this._toast.setMessage({
            text: 'Something went wrong, please try again later',
            level: 'DANGER',
            persistent: false
          });
        }
      );
  }

  showHideResponse() {
    this.showResponse = !this.showResponse;
    this.textarea.nativeElement.focus();
  }

  handleResponse(msg: string) {
    this._toast.setMessage({
      text: msg,
      level: 'SUCCESS',
      persistent: false
    });
  }

  cleanUpForm() {
    this.textarea.nativeElement.value = '';
    this.form.controls['message'].setValue('');
    this.showResponse = false;
    this.loading = false;
  }

  createNewAnswer() {
    const newAnswer: any = {
      message: this.form.value.message,
      date: Date.now()
    };

    if (this.anonymous) {
      newAnswer.user = 'anonymous';
    } else if (this.isHrView) {
      newAnswer.user = 'hr';
    } else {
      const email = this._auth.getUserInfo().sub.split('|')[2];
      newAnswer.user = email;
    }
    return newAnswer;
  }

  modifyConversation(thought) {
    const newAnswer = this.createNewAnswer();
    const { conversation } = thought;
    thought.conversation = conversation
      ? [...conversation, newAnswer]
      : [newAnswer];

    thought.answered = !this.anonymous;
    thought.read = !this.anonymous;
    return thought;
  }
}
