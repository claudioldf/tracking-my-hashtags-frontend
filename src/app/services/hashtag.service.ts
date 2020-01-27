import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { BASE_URL_API } from 'src/app/app.api';
import { Hashtag } from 'src/app/models/hashtag.model';
import { Observable } from 'rxjs';

@Injectable()
export class HashtagService {

  public constructor(private httpClient: HttpClient) { }

  public getAllHashtags(): Observable<Hashtag[]> {
    return this.httpClient.get<Hashtag[]>(`${BASE_URL_API}/hashtags`);
  }

  public create(hashtag: Hashtag): Observable<Hashtag> {
    return this.httpClient.post<Hashtag>(`${BASE_URL_API}/hashtags`, {
      hashtag: {
        name: hashtag.name.replace('#', '')
      }
    });
  }

  public delete(hashtag: Hashtag): Observable<Hashtag> {
    return this.httpClient.delete<Hashtag>(`${BASE_URL_API}/hashtags/${hashtag.id}`);
  }
}
