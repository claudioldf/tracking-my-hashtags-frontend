export class Hashtag {

  constructor(
    public name: string,
    public id?: number
  ) {
    this.name = `#${this.name.replace('#', '')}`;
  }

  public to_create_json() {
    return {
      name: this.name
    }
  }

}
