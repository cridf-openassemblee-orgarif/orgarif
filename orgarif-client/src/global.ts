import { ApplicationBootstrapData } from './generated/domain/BootstrapData.generated';

declare global {
  const bootstrapData: ApplicationBootstrapData;
  const csrfToken: string;
  var log: (mess: any) => void;
}
