import {
  NotificationContext,
  NotificationProviderProps,
} from '../contexts/notificationContext';

export type MockedNotificationProviderProps = {
  createNotification?: () => void;
  closeNotification?: () => void;
} & NotificationProviderProps;
export function MockedNotificationProvider({
  createNotification,
  closeNotification,
  ...rest
}: MockedNotificationProviderProps) {
  return (
    <NotificationContext.Provider
      {...rest}
      value={{
        notification: {
          status: false,
          type: 'info',
          message: '',
        },
        closeNotification: closeNotification ?? (() => undefined),
        createNotification: createNotification ?? (() => undefined),
      }}
    />
  );
}
