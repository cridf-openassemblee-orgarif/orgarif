// [doc] implem dans index
/* tslint:disable no-namespace */

declare namespace NodeJS {
  /* tslint:enable */
  export interface Global {
    window: any;
    __REDUX_DEVTOOLS_EXTENSION__: any;
    bootstrapData: any; // bootstrapData: ApplicationBootstrapData;
    log: (mess: any) => void;
  }
}

declare function log(mess: any): void;
