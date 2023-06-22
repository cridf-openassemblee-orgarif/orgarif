import { ApplicationBootstrapData } from './generated/domain/BootstrapData';

declare global {
  const bootstrapData: ApplicationBootstrapData;
  const csrfToken: string;
  var log: (mess: any) => void;
}
