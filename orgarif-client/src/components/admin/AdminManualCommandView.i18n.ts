import { i18n } from '../../i18n';

export const t = i18n({
  NoCommand: () => 'No command.',
  CommandAlreadyHandled: () => 'Command already handled.',
  InvalidJson: () => 'Invalid JSON.',
  ServerError: () => 'Server error: ',
  Command: () => 'Command:',
  HandleCommand: () => 'Handle command',
  ok: () => 'ok',
  Results: () => 'Results :',
  Commands: () => 'Commands',
  UpdateSessions: () => 'Update sessions',
  BatchCommands: () => '"Batch" commands',
  CommandsCanBeSentInGroup: () =>
    'Commands can be sent in group (they are sent & handled one by one to the backend)'
});
