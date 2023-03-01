'use client';

// import superjson from 'superjson';
import { Hydrate, HydrateProps } from '@tanstack/react-query';

function HydrateClient(props: HydrateProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Hydrate {...props} />;
}

export default HydrateClient;
