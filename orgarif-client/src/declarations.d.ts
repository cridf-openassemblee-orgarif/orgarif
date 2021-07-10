// [doc] implem dans index
/* tslint:disable no-namespace */

declare namespace NodeJS {
  /* tslint:enable */
  export interface Global {
    window: any;
    bootstrapData: any; // bootstrapData: ApplicationBootstrapData;
    log: (mess: any) => void;
  }
}

declare function log(mess: any): void;
