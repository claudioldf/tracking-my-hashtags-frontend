import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tweet } from 'src/app/models/tweet.model';
import { Hashtag } from 'src/app/models/hashtag.model';
import { Author } from 'src/app/models/author.model';

import { interval } from 'rxjs';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
  private myHashTags:Hashtag[] = [ new Hashtag(1, 'php') ];
  private tweets: Tweet[] = [  ];
  private updatingMessages: boolean = false;
  private interval: any;

  constructor() { }

  ngOnInit() {
    this.refreshData();

    this.interval = setInterval(() => {
        this.refreshData();
    }, 60000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  listenNewHashtagEvent(hashtag: Hashtag) {
    this.myHashTags.push(hashtag);

    this.refreshData();
  }

  refreshData(){
    this.updatingMessages = true;

    setTimeout(() => this.updatingMessages = false, 5000);

    let tweet = new Tweet(0, 'lorem ipsum dolor sit amet consectetur', '2019-01-01 19:20:32', new Author('@claudiodias', 'https://i.pravatar.cc/300', 320));
    this.tweets.push(tweet);
  }

}
