'use client';

import './globals.css';
// import trpc from 'utils/trpc';

import { ClientProvider } from './(components)/clientWrapper';

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head />
      <body>
        <header>
          <div className="menu">
            <div className="name">Global Chat</div>
            <div className="last">Ariel ops</div>
          </div>
        </header>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
