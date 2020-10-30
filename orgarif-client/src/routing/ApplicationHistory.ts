import * as history from 'history';
import { Route, routes } from './routes';

export class ApplicationHistory {
  private _browserHistory = history.createBrowserHistory();

  public get browserHistory() {
    return this._browserHistory;
  }

  public goTo(route: Route) {
    this._browserHistory.push(this.buildPath(route));
  }

  public goToReplace(route: Route) {
    this._browserHistory.replace(this.buildPath(route));
  }

  public buildPath(route: Route): string {
    let path = routes[route.name].path;
    Object.keys(route)
      .filter((k) => k !== 'name')
      .forEach((k: string) => {
        // @ts-ignore
        const param = route[k];
        if (path.indexOf(k) === -1) {
          throw Error(`Missing parameter ${k} in ${path}.`);
        }
        path = path.replace(':' + k, param);
      });
    return path;
  }
}
