import { state } from '../../state/state';
import { RecordUtils } from '../../utils/RecordUtils';
import { buildHash, Filters } from '../../utils/filters';
import { ApplicationRoute, routePathMap } from './routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export const buildPath = (route: ApplicationRoute, filters: Filters) => {
  let path = RecordUtils.getValue(routePathMap, route.name);
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
  return path + '#' + buildHash(filters);
};

export const useGoTo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const filters = useRecoilValue(state.filters);
  return (
    route: ApplicationRoute,
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
        (location.state as any | undefined)?.targetPath ??
        buildPath(route, filters);
      navigate(targetPath, {
        replace: options.replace ?? false,
        state: undefined
      });
    } else {
      navigate(buildPath(route, filters), {
        replace: options?.replace ?? false,
        state: options?.targetPath
          ? { targetPath: options.targetPath }
          : undefined
      });
    }
  };
};
