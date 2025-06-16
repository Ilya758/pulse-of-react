import { ComponentType } from 'react';
import { notifications } from '@mantine/notifications';
import { useMediaQuery } from '@mantine/hooks';
import { getNotificationConfig } from '../../lib';

export interface WithAnalyticsProps {
  trackEvent: (eventName: string, data?: Record<string, unknown>) => void;
}

export const withAnalytics = <P extends object>(
  WrappedComponent: ComponentType<P & WithAnalyticsProps>,
) => {
  return (props: P) => {
    const isDesktop = useMediaQuery('(min-width: 1024px)', true);

    const trackEvent = (eventName: string, data?: Record<string, unknown>) => {
      notifications.show({
        autoClose: 3000,
        position: isDesktop ? 'bottom-right' : 'top-right',
        message: `${eventName}${data ? `: ${JSON.stringify(data)}` : ''}`,
        title: 'Analytics Event',
        ...getNotificationConfig(eventName),
      });
    };

    return <WrappedComponent {...props} trackEvent={trackEvent} />;
  };
};

