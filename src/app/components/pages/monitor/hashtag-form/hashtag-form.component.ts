import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Hashtag } from 'src/app/models/hashtag.model';

@Component({
  selector: 'app-hashtag-form',
  templateUrl: './hashtag-form.component.html',
  styleUrls: ['./hashtag-form.component.scss']
})
export class HashtagFormComponent implements OnInit {
  word = new FormControl('', Validators.required);

  @Output() emitNewHashtagEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  add(): void {
    let hashtag = new Hashtag(0, this.word.value);

    this.emitNewHashtagEvent.emit(hashtag);

    this.word.reset();
  }

}
