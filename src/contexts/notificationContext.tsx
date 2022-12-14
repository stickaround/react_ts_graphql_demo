import * as React from 'react';
import { AlertColor } from '@mui/material';
import { Notification } from '../core/components/Notification';

type Notification = {
  status: boolean;
  type: AlertColor;
  message: string;
};
export type NotificationProviderProps = { children: React.ReactNode };

export const NotificationContext = React.createContext<
  | {
      notification: Notification;
      createNotification: (type: AlertColor, message: string) => void;
      closeNotification: () => void;
    }
  | undefined
>(undefined);

function NotificationProvider({ children }: NotificationProviderProps) {
  const [notification, setNotification] = React.useState<Notification>({
    status: false,
    type: 'info',
    message: '',
  });
  const createNotification = React.useCallback(
    (type: AlertColor, message: string) =>
      setNotification({
        status: true,
        type,
        message,
      }),
    []
  );
  const closeNotification = () => {
    setNotification({
      status: false,
      type: 'info',
      message: '',
    });
  };

  return (
    <NotificationContext.Provider
      value={{ notification, createNotification, closeNotification }}
    >
      {children}
      <Notification />
    </NotificationContext.Provider>
  );
}

function useNotificationContext() {
  const context = React.useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'Notification context must be used in Notification Context Provider!'
    );
  }
  return context;
}

export { useNotificationContext, NotificationProvider };
