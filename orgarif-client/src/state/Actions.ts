import { useRecoilState } from 'recoil';
import { appContext } from '../ApplicationContext';
import { RegisterCommand } from '../domain/command';
import { Errors } from '../errors';
import { RegisterFormDto } from '../form/RegisterForm';
import { assertUnreachable } from '../utils';
import { state } from './state';

export class Actions {
  listOrganismes = () => appContext.queryService().listOrganismesQuery();

  register = (registerInput: RegisterFormDto) => {
    const registerCommand: RegisterCommand = {
      ...registerInput,
    };
    return appContext
      .commandService()
      .registerCommand(registerCommand)
      .then((r) => {
        switch (r.result) {
          case 'REGISTERED':
            if (!r.userinfos) {
              throw Errors._db434940();
            }
            appContext.csrfTokenService().refreshToken();
            const [_, setUserInfos] = useRecoilState(state.userInfos);
            setUserInfos(r.userinfos);
            break;
          case 'MAIL_ALREADY_EXISTS':
            break;
          default:
            assertUnreachable(r.result);
        }
        return r.result;
      });
  };
}
