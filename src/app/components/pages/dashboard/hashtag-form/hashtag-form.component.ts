import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Hashtag } from 'src/app/models/hashtag.model';
import { HashtagService } from 'src/app/services/hashtag.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-hashtag-form',
  templateUrl: './hashtag-form.component.html'
})
export class HashtagFormComponent implements OnInit {
  hashtagName = new FormControl('', Validators.required);

  @Output() emitEvent = new EventEmitter();

  constructor(
    private hashtagService: HashtagService,
    private notifierService: NotifierService
  ) { }

  ngOnInit() {
  }

  create(): void {
    if (!this.hashtagName.value) {
      this.notifierService.notify("error", 'Please, enter the hashtag');
      return;
    }

    let hashtag = new Hashtag(this.hashtagName.value);

    this.hashtagService.create(hashtag)
      .subscribe(
        (hashtag: Hashtag) => {
          this.emitEvent.emit({type: 'hashtagCreated', payload: hashtag});
          this.hashtagName.reset();

          this.notifierService.notify("success", "Hashtag added!");
        },
        (error: any) => {
          this.notifierService.notify("error", "Something unexpected happens! Please try again.");
        }
      );
  }

}
