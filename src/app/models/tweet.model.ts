import { Hashtag } from 'src/app/models/hashtag.model';
import { Author } from './author.model';

export class Tweet {

  constructor(
    public id: number,
    public message: string,
    public published_at: string,
    public author: Author,
    public hashtags?: Hashtag[]
  ) { }

}
