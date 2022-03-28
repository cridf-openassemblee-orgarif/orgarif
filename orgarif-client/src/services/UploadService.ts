import { UserFileId } from '../domain/ids';
import { appContext } from '../ApplicationContext';

export interface UploadResult {
  result: 'successed' | 'failed' | 'file too big';
  userFileId?: UserFileId;
}

// const fakeData = (size: number) => {
//   let data = '';
//   for (let i = 0; i < size; i++) {
//     data += '-';
//   }
//   console.log(data);
//   return data;
// };

export default class UploadService {
  public uploadFile = (file: File): Promise<UploadResult> => {
    // [doc] -200b de "sécurité", il semble que Spring rejette l'upload sur la base du Content-Length
    // TODO file too big peut donc arriver malgré cette secu front : gérer aussi cette erreur du back
    if (file.size > 10 * 1024 * 1024 - 200) {
      const r: UploadResult = {
        result: 'file too big'
      };
      return Promise.resolve(r);
    }
    const data = new FormData();
    data.append('file', file, file.name);
    const params: RequestInit = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        [appContext.csrfTokenService().header]:
          appContext.csrfTokenService().token
      },
      credentials: appContext.httpService().credentials
    };
    params.body = data;
    return fetch('/upload-file', params)
      .then((response: Response) => {
        if (!response.ok) {
          // FIXMENOW cleaning
          // FIXMENOW faire throw comme dans HttpSservice ?
          const r: UploadResult = {
            result: 'failed'
          };
          return r;
        } else {
          return response.text().then(t => {
            const userFileId = JSON.parse(t) as UserFileId;
            const r: UploadResult = {
              result: 'successed',
              userFileId
            };
            return r;
          });
        }
      })
      .catch(() => {
        const r: UploadResult = {
          result: 'failed'
        };
        return r;
      });
  };
}
