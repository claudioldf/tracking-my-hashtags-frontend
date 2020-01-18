import { Component, OnInit, Input } from '@angular/core';
import { Tweet } from 'src/app/models/tweet.model';

@Component({
  selector: 'app-card-tweet',
  templateUrl: './card-tweet.component.html',
  styleUrls: ['./card-tweet.component.scss']
})
export class CardTweetComponent implements OnInit {
  @Input() private tweet: Tweet;

  constructor() { }

  ngOnInit() {
  }

}
