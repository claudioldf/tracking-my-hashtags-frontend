export class Hashtag {

  constructor(
    private id: number,
    private word: string
  ) {
    this.word = `#${this.word.replace('#', '')}`;
  }

}
