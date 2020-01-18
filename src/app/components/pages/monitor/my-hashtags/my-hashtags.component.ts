import { Component, OnInit, Input } from '@angular/core';
import { Hashtag } from 'src/app/models/hashtag.model';

@Component({
  selector: 'app-my-hashtags',
  templateUrl: './my-hashtags.component.html',
  styleUrls: ['./my-hashtags.component.scss']
})
export class MyHashtagsComponent implements OnInit {
  @Input() myHashTags: Hashtag[];

  constructor() { }

  ngOnInit() {
  }

  public remove(event, hashtag: Hashtag) {
    // alert('Remover hashtag ' + hashtag.id);
  }

}
