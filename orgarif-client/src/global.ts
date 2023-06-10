import { ApplicationBootstrapData } from './generated/domain/bootstrap-data';

declare global {
  const bootstrapData: ApplicationBootstrapData;
  const csrfToken: string;
  var log: (mess: any) => void;
}
