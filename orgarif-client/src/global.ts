import { ApplicationBootstrapData } from './generated/domain/bootstrap-data';

declare global {
  const bootstrapData: ApplicationBootstrapData;
  var log: (mess: any) => void;
}
