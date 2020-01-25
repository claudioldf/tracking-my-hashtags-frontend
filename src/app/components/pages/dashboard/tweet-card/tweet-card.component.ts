import { Component, OnInit, Input } from '@angular/core';
import { Tweet } from 'src/app/models/tweet.model';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss']
})
export class TweetCardComponent implements OnInit {
  @Input() private tweet: Tweet;

  constructor() { }

  ngOnInit() {
  }

}
