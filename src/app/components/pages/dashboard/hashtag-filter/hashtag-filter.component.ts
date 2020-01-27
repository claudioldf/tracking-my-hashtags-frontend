import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Hashtag } from 'src/app/models/hashtag.model';
import { HashtagService } from 'src/app/services/hashtag.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-hashtag-filter',
  templateUrl: './hashtag-filter.component.html'
})
export class HashtagFilterComponent implements OnInit {
  hashtagInputFilter = new FormControl('', Validators.required);

  @Output() emitEvent = new EventEmitter();

  public showWouldLikeToAdd: boolean = false;

  constructor(
    private hashtagService: HashtagService,
    private notifierService: NotifierService
  ) { }

  ngOnInit() {
  }

  filter(): void {
    if (!this.hashtagInputFilter.value) {
      this.notifierService.notify("error", 'Please, enter the hashtag');
      return;
    }

    this.emitEvent.emit({type: 'filterTweets', payload: this.hashtagInputFilter.value.split(",").map((x) => x.trim())});
    this.showWouldLikeToAdd = true;
  }

  add(): void {
    if (!this.hashtagInputFilter.value) {
      return;
    }

    let wordsList = this.hashtagInputFilter.value.split(',').map(x => x.trim())

    wordsList.forEach((word) => {
      let hashtag = new Hashtag(word);

      this.hashtagService.create(hashtag)
        .subscribe(
          (hashtag: Hashtag) => {
            this.emitEvent.emit({type: 'hashtagCreated', payload: hashtag});
            this.notifierService.notify("success", `Hashtag ${hashtag.name} added!`);
          },
          (error: any) => {
            this.notifierService.notify("error", `Hashtag ${hashtag.name} not added!`);
          }
        );
    });
  }
}
