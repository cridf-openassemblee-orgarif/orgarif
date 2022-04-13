import { Route, routes } from './routes';
import { useLocation, useNavigate } from 'react-router-dom';

export const buildPath = (route: Route) => {
  let path = routes[route.name].path;
  Object.keys(route)
    .filter(k => k !== 'name')
    .forEach((k: string) => {
      // @ts-ignore
      const param = route[k];
      if (path.indexOf(k) === -1) {
        throw Error(`Missing parameter ${k} in ${path}.`);
      }
      path = path.replace(':' + k, param);
    });
  return path;
};

export const useGoTo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    route: Route,
    options?: {
      replace?: boolean;
      targetPath?: string;
      useTargetPath?: boolean;
    }
  ) => {
    if (options?.targetPath && options?.useTargetPath) {
      throw Error();
    }
    if (options?.useTargetPath) {
      const targetPath =
        (location.state as any | undefined)?.targetPath ?? buildPath(route);
      navigate(targetPath, {
        replace: options.replace ?? false,
        state: undefined
      });
    } else {
      navigate(buildPath(route), {
        replace: options?.replace ?? false,
        state: options?.targetPath
          ? { targetPath: options.targetPath }
          : undefined
      });
    }
  };
};
