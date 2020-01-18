import { Hashtag } from 'src/app/models/hashtag.model';
import { Author } from './author.model';

export class Tweet {

  constructor(
    private id: number,
    private message: string,
    private published_at: string,
    private author: Author,
    private hashtags?: Hashtag[]
  ) { }

}
