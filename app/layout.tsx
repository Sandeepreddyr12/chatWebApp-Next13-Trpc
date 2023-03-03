import './globals.css';
// import trpc from 'utils/trpc';

import { ClientProvider } from './clientWrapper';

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head />
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
