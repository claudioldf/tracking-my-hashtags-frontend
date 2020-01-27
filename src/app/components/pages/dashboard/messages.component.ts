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
  public hashtagList: Hashtag[];

  private tweetsSubscription: Subscription;
  private tweets$: Observable<Tweet[]>;

  private refreshIntervalSeconds: number = 90;
  public refreshWaitingSeconds: number = 0;
  public autoSearchEnabled: boolean = true;

  public loadingMessages: boolean = false;
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
        this.hashtagList = hashtags
      })

    this.refreshWaitingSeconds = this.refreshIntervalSeconds;
    interval(1000)
      .pipe(
        startWith(this.refreshIntervalSeconds),
      ).subscribe(() => {
        if (this.refreshWaitingSeconds <= 0) {
          this.refreshWaitingSeconds = this.refreshIntervalSeconds;
        } else {
          this.refreshWaitingSeconds--;
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

  listenEventEmitted(event): void {
    let methods = {
      hashtagCreated: (hashtag: Hashtag) => {
        this.hashtagService.create(hashtag);

        this.hashtagList.push(hashtag as Hashtag);
      },
      hashtagDeleted: (hashtag: Hashtag) => {
        this.hashtagService.delete(hashtag);

        this.hashtagList = this.hashtagList.filter((h: Hashtag) => {
          return h.id != hashtag.id;
        });
      },
      filterTweets: (filterHashtags:[]) => {
        this.refreshTweets(filterHashtags);
      }
    };

    if (!methods[event.type]) {
      return;
    }

    methods[event.type](event.payload);
  }

  toggleAutoSearch(): void {
    this.autoSearchEnabled = !this.autoSearchEnabled;

    if (!this.autoSearchEnabled && this.tweetsSubscription) {
      this.tweetsSubscription.unsubscribe();
    }
  }

  refreshTweets(filterHashtags:[] = []): void {
    this.loadingMessages = true;

    if (this.hashtagList && this.hashtagList.length == 0) {
      return;
    }

    this.tweets$ = this.tweetService.getAllTweets(filterHashtags);

    this.tweetsSubscription = this.tweets$.subscribe(
      (tweets) => {
        this.loadingMessages = false;
        this.notifierService.notify("success", "Your Twitter message's list was updated successfully!");
      },
      (error: any) => {
        this.loadingMessages = false;

        if (error.status == 429) {
          this.notifierService.notify("error", "Too many request in a short period of time.");
          this.autoSearchEnabled = false;
        } else {
          this.notifierService.notify("error", "We are not able to refresh the content of this page at the moment.");
        }
      }
    );
  }

}
