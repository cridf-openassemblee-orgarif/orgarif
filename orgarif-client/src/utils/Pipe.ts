export const pipe = <T>(value: T) => new Pipe(value);

export class Pipe<T> {
  private t: T;

  constructor(t: T) {
    this.t = t;
  }

  // map = <U>(lambda: (t: T, ...l: any) => U, ...p: any): Pipe<U> => new Pipe(lambda(this.t, p));
  // .map(replaceAll, '<mj-fragment>', '')
  map = <U>(lambda: (t: T) => U): Pipe<U> => new Pipe(lambda(this.t));

  unwrap = () => this.t;
}
