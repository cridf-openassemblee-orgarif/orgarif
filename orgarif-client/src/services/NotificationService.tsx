import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';

export type NotificationLevel = 'warning' | 'info';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export class NotificationService {
  public notifications = [] as [
    string,
    { message: string; level: NotificationLevel }
  ][];

  public displayNotification = (
    message: string,
    level: NotificationLevel = 'info'
  ) => {
    <Snackbar autoHideDuration={6000}>
      <Alert severity={level} sx={{ width: '50%' }}>
        {message}
      </Alert>
    </Snackbar>;
  };
}
