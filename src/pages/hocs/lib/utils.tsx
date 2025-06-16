import { IconAlertCircle, IconInfoCircle } from '@tabler/icons-react';

export const getNotificationConfig = (eventName: string) => {
  switch (eventName) {
    case 'error': {
      return {
        color: 'red',
        icon: <IconAlertCircle size={16} />,
      };
    }

    case 'profile': {
      return {
        color: 'green',
        icon: <IconInfoCircle size={16} />,
      };
    }

    case 'logout': {
      return {
        color: 'orange',
        icon: <IconInfoCircle size={16} />,
      };
    }

    default: {
      return {
        color: 'blue',
        icon: <IconInfoCircle size={16} />,
      };
    }
  }
};
