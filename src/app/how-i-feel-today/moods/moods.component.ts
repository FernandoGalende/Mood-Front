import {
  Component,
  EventEmitter,
  HostBinding,
  OnInit,
  Output
} from '@angular/core';
import { ApiService } from '../../services/api.service';

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
@Component({
  selector: 'app-moods',
  templateUrl: './moods.component.html',
  styleUrls: ['./moods.component.scss']
})
export class MoodsComponent implements OnInit {
  @HostBinding('class')
  hostClass = 'moods';
  @Output()
  selectedMood: EventEmitter<string>;
  blocked: boolean;
  ready: boolean;
  showError: boolean;

  constructor(private _api: ApiService) {
    this.selectedMood = new EventEmitter<string>();
    this.blocked = true;
    this.ready = false;
    this.showError = false;
  }

  ngOnInit() {
    this._api.getLastMood().subscribe(
      res => {
        this.showError = false;
        const element = res.data.Items;
        if (element.length > 0) {
          this.blocked = this.checkDate(new Date(+element[0].date), new Date());
        } else {
          this.blocked = false;
        }
        this.ready = true;
      },
      err => {
        this.showError = true;
      }
    );
  }

  checkDate(date: Date, today: Date): boolean {
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  onMoodSelect(mood: string) {
    this.selectedMood.emit(mood);
  }
}
