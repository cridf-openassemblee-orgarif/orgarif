import { i18n } from '../../i18n';

export const t = i18n({
  EditUserRoles: () => 'Edit user roles',
  WarningAdmin: () =>
    "By removing your Admin role you instantly won't have admin \n" +
    'rights anymore, and will not be able to get the Admin role \n' +
    'back.',
  WarningAdminWithNoUser: () =>
    'Admin role is supposed to be paired with User role, you will \n' +
    'encounter bugs otherwise.',
  Close: () => 'Close',
  Save: () => 'Save'
});
