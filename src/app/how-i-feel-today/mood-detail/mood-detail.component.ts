import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Message } from '../../interfaces/message';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-mood-detail',
  templateUrl: './mood-detail.component.html',
  styleUrls: ['./mood-detail.component.scss']
})
export class MoodDetailComponent implements OnInit {
  @HostBinding('class')
  hostClass = 'mood-detail';
  @Input()
  selectedMood: string;
  @Output()
  formSubmission: EventEmitter<Message>;
  form: FormGroup;
  loading: boolean;
  subscription: Subscription;

  constructor(private _fb: FormBuilder, private _api: ApiService) {
    this.form = this._fb.group({
      message: ['', Validators.maxLength(500)],
      anonymous: [false]
    });
    this.loading = false;
    this.formSubmission = new EventEmitter<Message>();
  }

  ngOnInit() {}

  onSubmit() {
    this.loading = true;
    this._api
      .sendMood(
        this.selectedMood,
        this.form.value.message,
        this.form.value.anonymous
      )
      .subscribe(
        () => {
          this.loading = false;
          this.formSubmission.emit({
            text: 'Thank you, message is sent!',
            level: 'SUCCESS',
            persistent: false
          });
        },
        err => {
          this.loading = false;
          this.formSubmission.emit({
            text: 'There was an error, please try again later :)',
            level: 'DANGER',
            persistent: false
          });
        }
      );
  }
}
