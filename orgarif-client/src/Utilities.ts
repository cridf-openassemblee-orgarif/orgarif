interface Array<T> {
  flatMap(lambda: (o: T, i: number) => any): any[];
}

interface String {
  latinize(): string;

  replaceAll(search: string, replacement: string): string;

  toInt(): number;
}
