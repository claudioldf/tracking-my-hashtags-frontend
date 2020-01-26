import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, interval, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

// third libs
import { NotifierService } from "angular-notifier";

import { Hashtag } from 'src/app/models/hashtag.model';
import { Tweet } from 'src/app/models/tweet.model';

import { HashtagService } from 'src/app/services/hashtag.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
})
export class MessagesComponent implements OnInit, OnDestroy {
  public myHashTags: Hashtag[];

  public tweetsSubscription: Subscription;
  public tweets$: Observable<Tweet[]>;

  public loadingMessages: boolean = false;
  public refreshIntervalSeconds: number = 90;
  public refreshWaitingSeconds: number = 0;
  public autoSearchEnabled: boolean = true;

  public pageTitle: string = "Messages";

  constructor(
    private hashtagService: HashtagService,
    private tweetService: TweetService,
    private notifierService: NotifierService
  ) { }

  ngOnInit() {
    this.hashtagService.getAllHashtags()
      .toPromise()
      .then((hashtags: Hashtag[]) => {
        this.myHashTags = hashtags
      })

    interval(1000)
      .pipe(
        startWith(this.refreshIntervalSeconds),
      ).subscribe(() => {
        this.refreshWaitingSeconds--;

        console.log('timing...' + this.refreshWaitingSeconds);

        if (this.refreshWaitingSeconds <= 0) {
          this.refreshWaitingSeconds = this.refreshIntervalSeconds;
        }
      })

    interval(this.refreshIntervalSeconds * 1000)
      .pipe(
        startWith(0),
      )
      .subscribe(() => {
        if (this.autoSearchEnabled) {
          this.refreshTweets()
        }
      })
  }

  ngOnDestroy(): void {
    this.tweetsSubscription.unsubscribe();
  }

  listenEventEmitted(event) {
    let methods = {
      hashtagCreated: (self, payload: Hashtag) => {
        self.hashtagService.create(payload);

        self.myHashTags.push(payload as Hashtag);
      },
      hashtagDeleted: (self, payload: Hashtag) => {
        self.hashtagService.delete(payload.id);

        self.myHashTags.filter((hashtag: Hashtag) => {
          return hashtag.id == payload.id;
        });
      }
    };

    methods[event.type](this, event.payload);

    this.hashtagService.getAllHashtags()
      .toPromise()
      .then((hashtags: Hashtag[]) => {
        this.myHashTags = hashtags
      })
  }

  toggleAutoSearch(): void {
    this.autoSearchEnabled = !this.autoSearchEnabled;

    if (!this.autoSearchEnabled && this.tweetsSubscription) {
      this.tweetsSubscription.unsubscribe();
    }
  }

  refreshTweets(): void {
    this.loadingMessages = true;

    if (this.myHashTags && this.myHashTags.length == 0) {
      return;
    }

    if (this.tweets$ === undefined) {
      this.tweets$ = this.tweetService.getAllTweets();
    }

    this.tweetsSubscription = this.tweets$.subscribe(
      (tweets) => {
        this.loadingMessages = false;
        this.notifierService.notify("success", "Your Twitter message's list was updated successfully!");
      },
      (error: any) => {
        this.loadingMessages = false;

        if (error.status == 429) {
          this.notifierService.notify("error", "Too many request in a short period of time. Please waiting some minutes and try again.");
          this.autoSearchEnabled = false;
        } else {
          this.notifierService.notify("error", "Sorry, but we could not update your messages right now. Please waiting some time and try again");
        }
      }
    );
  }

}
