import { useDialectSdk } from '@dialectlabs/react-sdk';
import { NoNotifications } from './NoNotifications';
import { NotificationsList } from './NotificationsList';
import { Message } from './types';

export const NotificationsFeed = () => {
  const messages: Message[] = [
    {
      id: 1,
      text: 'Your Tensorian #5672 sold for 44 SOL.',
      timestamp: new Date(),
      metadata: { title: 'Listing Sold' },
    },
    {
      id: 2,
      text: 'message',
      timestamp: new Date(),
      metadata: {
        title:
          'Your 200 SOL offer on Mad Lad #9477 has been outbid, at 205 SOL.',
        actions: [{ url: 'https://dialect.to', label: 'Trade now' }],
      },
    },
    {
      id: 3,
      text: 'You received a new highest bid of 42.69 SOL on your Tensorian #5672.',
      timestamp: new Date(),
      metadata: { title: 'You received a new highest bid' },
    },
    {
      id: 4,
      text: 'Your $WIF-SOL Bid Ask DLMM Position is out of range. Update your strategy to avoid impermanent loss.',
      timestamp: new Date(),
      metadata: {
        title: 'DLMM Position is Out of Range',
        actions: [{ url: 'https://dialect.to', label: 'Trade now' }],
      },
    },
    {
      id: 5,
      text: 'You received a new highest bid of 150 SOL on your MadLad #1234.',
      timestamp: new Date(),
      metadata: { title: 'You received a new highest bid' },
    },
    {
      id: 6,
      text: 'You received a new highest bid of 150 SOL on your MadLad #1234.',
      timestamp: new Date(),
      metadata: { title: 'You received a new highest bid' },
    },
  ];

  if (!messages.length) {
    return <NoNotifications />;
  }
  return <NotificationsList.Container messages={messages} />;
};

NotificationsFeed.Container = function NotificationsFeeContainer() {
  const sdk = useDialectSdk();
  sdk.tokenProvider.get();

  return <NotificationsFeed />;
};