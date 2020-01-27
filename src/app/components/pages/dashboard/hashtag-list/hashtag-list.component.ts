import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Hashtag } from 'src/app/models/hashtag.model';
import { HashtagService } from 'src/app/services/hashtag.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-hashtag-list',
  templateUrl: './hashtag-list.component.html'
})
export class HashtagListComponent implements OnInit {
  @Input() hashtagList: Hashtag[];

  @Output() emitEvent = new EventEmitter();

  constructor(
    private hashtagService: HashtagService,
    private notifierService: NotifierService
  ) { }

  ngOnInit() { }

  delete(hashtag: Hashtag): void {
    this.hashtagService.delete(hashtag)
      .subscribe(
        () => {
          this.emitEvent.emit({type: 'hashtagDeleted', payload: hashtag});
          this.notifierService.notify("success", "Hashtag removed!");
        },
        (error: any) => {
          this.notifierService.notify("error", "Something unexpected happens! Please try again.");
        },
      );
  }

}
