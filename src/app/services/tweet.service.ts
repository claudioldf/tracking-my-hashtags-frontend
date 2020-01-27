import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { BASE_URL_API } from 'src/app/app.api';
import { Tweet } from 'src/app/models/tweet.model';
import { Observable } from 'rxjs';
import { Author } from '../models/author.model';
import { map, share } from "rxjs/operators";


@Injectable()
export class TweetService {

  public constructor(private httpClient: HttpClient) { }

  public getAllTweets(filterHashtags = []): Observable<Tweet[]> {
    let httpParams = new HttpParams();
    Object.keys(filterHashtags).forEach(function (key) {
      httpParams = httpParams.append('hashtags[]', filterHashtags[key]);
    });

    return this.httpClient.get<Tweet[]>(`${BASE_URL_API}/messages`, {
      params: httpParams
    })
      .pipe(
        share(),
        map(response => {
          let tweets = response.map((response: any) => {
            let author = new Author(`@${response.screen_name}`, response.user.profile_image_uri, response.user.followers_count);
            let tweet = new Tweet(response.id, response.text, response.published_at, author)
            return tweet;
          });

          return tweets
        })
      )
  }
}
